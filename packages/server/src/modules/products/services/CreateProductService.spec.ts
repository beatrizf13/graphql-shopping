import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from './CreateProductService';

let fakeProductsRepository: FakeProductsRepository;
let createProduct: CreateProductService;

describe('CreateProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    createProduct = new CreateProductService(fakeProductsRepository);
  });

  it('should be able to create a product', async () => {
    const product = await createProduct.execute({
      name: 'Shoe',
      description: 'A nice shoe!',
      imageUrl: 'http://image.com',
      price: 199.99,
      quantity: 10,
    });

    expect(product.id).toBeTruthy();
  });
});
