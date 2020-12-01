import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ListProductsService from './ListProductsService';

let fakeProductsRepository: FakeProductsRepository;
let listProducts: ListProductsService;

describe('ListProducts', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    listProducts = new ListProductsService(fakeProductsRepository);
  });

  it('should be able to list all products', async () => {
    const product1 = await fakeProductsRepository.create({
      name: 'Shoe',
      description: 'A nice shoe!',
      imageUrl: 'http://image.com',
      price: 199.99,
      quantity: 10,
    });

    const product2 = await fakeProductsRepository.create({
      name: 'Shoe 2',
      description: 'A nice shoe 2!',
      imageUrl: 'http://image.com',
      price: 199.99,
      quantity: 10,
    });

    const products = await listProducts.execute();

    expect(products).toEqual([product1, product2]);
  });
});
