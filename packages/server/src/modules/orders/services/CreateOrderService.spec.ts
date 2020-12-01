import FakeCostumersRepository from '../../costumers/repositories/fakes/FakeCostumersRepository';
import FakeProductsRepository from '../../products/repositories/fakes/FakeProductsRepository';
import FakeOrdersRepository from '../repositories/fakes/FakeOrdersRepository';
import CreateOrderService from './CreateOrderService';

let fakeOrdersRepository: FakeOrdersRepository;
let fakeCostumersRepository: FakeCostumersRepository;
let fakeProductsRepository: FakeProductsRepository;

let createOrder: CreateOrderService;

describe('CreateOrder', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();
    fakeCostumersRepository = new FakeCostumersRepository();
    fakeOrdersRepository = new FakeOrdersRepository();

    createOrder = new CreateOrderService(
      fakeProductsRepository,
      fakeCostumersRepository,
      fakeOrdersRepository,
    );
  });

  it('should be able to create a order', async () => {
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

    const order = await createOrder.execute({
      costumerId: costumer.id,
      items: [{ productId: product.id, quantity: 1 }],
    });

    expect(order.id).toBeTruthy();
  });
});
