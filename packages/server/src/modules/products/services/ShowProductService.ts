import { injectable, inject } from 'tsyringe';
import { Product } from '../infra/typeorm/models/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Product> {
    const product = await this.productsRepository.findById(id);

    return product;
  }
}

export default ShowProductService;
