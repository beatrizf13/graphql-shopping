import FakeCostumersRepository from '../../costumers/repositories/fakes/FakeCostumersRepository';
import FakeProductsRepository from '../../products/repositories/fakes/FakeProductsRepository';
import { OrderItem } from '../infra/typeorm/models/OrderItem';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import ListOrdersByCostumerService from './ListOrdersByCostumerService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeCostumersRepository: FakeCostumersRepository;
let fakeProductsRepository: FakeProductsRepository;

let listOrders: ListOrdersByCostumerService;

describe('ListOrdersByCostumer', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCostumersRepository = new FakeCostumersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();

    listOrders = new ListOrdersByCostumerService(fakeOrdersRepository);
  });

  it('should be able to list all orders', async () => {
    const costumer = await fakeCostumersRepository.create({
      name: 'John',
    });

    const product = await fakeProductsRepository.create({
      name: 'Shoe',
      description: 'A nice shoe!',
      imageUrl: 'http://image.com',
      price: 199.99,
      quantity: 10,
    });

    const orderItem = new OrderItem();

    Object.assign(orderItem, {
      quantity: 1,
      product,
      price: product.price,
    });

    const order = await fakeOrdersRepository.create({
      costumer,
      items: [orderItem],
      totalPrice: 199.99,
    });

    const orders = await listOrders.execute({ costumerId: costumer.id });

    expect(orders).toEqual([order]);
  });
});
