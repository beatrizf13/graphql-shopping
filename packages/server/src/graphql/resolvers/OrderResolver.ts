import {
  Resolver, Query, Mutation, Arg,
} from 'type-graphql';
import { Order } from '../../typeorm/models/Order';
import { OrderItem } from '../../typeorm/models/OrderItem';
import { Product } from '../../typeorm/models/Product';
import { Costumer } from '../../typeorm/models/Costumer';
import { CreateOrderInput } from '../inputs/CreateOrderInput';

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  orders():Promise<Order[]> {
    return Order.find({ relations: ['costumer', 'items'] });
  }

  @Query(() => Order)
  order(@Arg('id') id: string):Promise<Order> {
    return Order.findOne({ where: { id }, relations: ['costumer', 'items'] });
  }

  @Mutation(() => Order)
  async createOrder(@Arg('data') { costumerId, items }: CreateOrderInput):Promise<Order> {
    if (items.length <= 0) {
      throw new Error('order is not allowed without products');
    }

    const productsIds = items.map((item) => item.productId);

    const hasDuplicatedProduct = productsIds.some(
      (productId, index) => productsIds.indexOf(productId) !== index,
    );

    if (hasDuplicatedProduct) {
      throw new Error('some product is duplicated');
    }

    let products = await Product.findByIds(productsIds);

    products = items.map((item) => {
      const product = products.find((findProduct) => findProduct.id === item.productId);

      if (item.quantity <= 0) {
        throw new Error('quantity of a product must be greater than 0');
      }

      if (item.quantity > product.quantity) {
        throw new Error('quantity of some product is not available');
      }

      product.quantity -= item.quantity;

      return product;
    });

    const costumer = await Costumer.findOne(costumerId);

    let totalPrice = 0;

    const order = await Order.create({
      costumer,
      totalPrice,
      items: [],
    }).save();

    let orderItems: OrderItem[] = items.map((item) => {
      const product = products.find((findProduct) => findProduct.id === item.productId);

      const orderItem = OrderItem.create({
        order,
        quantity: item.quantity,
        product,
        price: product.price,
      });

      totalPrice += product.price * item.quantity;

      return orderItem;
    });

    await Product.save(products);

    orderItems = await OrderItem.save(orderItems);

    Object.assign(order, { totalPrice, items: orderItems });

    await order.save();

    return order;
  }
}
