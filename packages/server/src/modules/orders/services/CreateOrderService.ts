import { injectable, inject } from 'tsyringe';
import { ICostumersRepository } from '../../costumers/repositories/ICostumersRepository';
import { IProductsRepository } from '../../products/repositories/IProductsRepository';
import { Order } from '../infra/typeorm/models/Order';
import { OrderItem } from '../infra/typeorm/models/OrderItem';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

interface IItem {
  productId: string;
  quantity: number;
}

interface IRequest {
  costumerId: string;
  creditCard: string;
  items: IItem[];
}

@injectable()
class CreateOrderService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,

    @inject('CostumersRepository')
    private costumersRepository: ICostumersRepository,

    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({
    costumerId,
    items,
    creditCard,
  }: IRequest): Promise<Order> {
    if (creditCard !== '1111111111111111') {
      throw new Error('payment denied');
    }

    if (items.length <= 0) {
      throw new Error('order is not allowed without products');
    }

    items.forEach(item => {
      if (item.quantity <= 0) {
        throw new Error('some product is less than or equal to 0');
      }
    });

    const productsIds = items.map(item => item.productId);

    const hasDuplicatedProduct = productsIds.some(
      (productId, index) => productsIds.indexOf(productId) !== index,
    );

    if (hasDuplicatedProduct) {
      throw new Error('some product is duplicated');
    }

    let products = await this.productsRepository.findByIds(productsIds);

    products = items.map(item => {
      const product = products.find(
        findProduct => findProduct.id === item.productId,
      );

      if (item.quantity <= 0) {
        throw new Error('quantity of products must be greater than 0');
      }

      if (item.quantity > product.quantity) {
        throw new Error('quantity of some product is not available');
      }

      product.quantity -= item.quantity;

      return product;
    });

    const costumer = await this.costumersRepository.findById(costumerId);

    let totalPrice = 0;

    const orderItems: OrderItem[] = items.map(item => {
      const product = products.find(
        findProduct => findProduct.id === item.productId,
      );

      const orderItem = new OrderItem();

      Object.assign(orderItem, {
        quantity: item.quantity,
        product,
        price: product.price,
      });

      totalPrice += product.price * item.quantity;

      return orderItem;
    });

    await this.productsRepository.save(products);

    const order = await this.ordersRepository.create({
      costumer,
      totalPrice,
      items: orderItems,
    });

    return order;
  }
}

export default CreateOrderService;
