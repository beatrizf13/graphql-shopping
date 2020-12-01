import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import ShowProductService from './ShowProductService';

let fakeProductsRepository: FakeProductsRepository;
let showProduct: ShowProductService;

describe('ShowProduct', () => {
  beforeEach(() => {
    fakeProductsRepository = new FakeProductsRepository();

    showProduct = new ShowProductService(fakeProductsRepository);
  });

  it('should be able to show a product', async () => {
    const product = await fakeProductsRepository.create({
      name: 'Shoe',
      description: 'A nice shoe!',
      imageUrl: 'http://image.com',
      price: 199.99,
      quantity: 10,
    });

    const findProduct = await showProduct.execute({
      id: product.id,
    });

    expect(product).toEqual(findProduct);
  });
});
