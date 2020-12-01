import { injectable, inject } from 'tsyringe';
import { Product } from '../infra/typeorm/models/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.find();

    return products;
  }
}

export default ListProductsService;
