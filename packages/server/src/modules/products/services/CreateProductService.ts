import { injectable, inject } from 'tsyringe';
import { Product } from '../infra/typeorm/models/Product';
import { IProductsRepository } from '../repositories/IProductsRepository';

interface IRequest {
  name: string;
  description: string;
  imageUrl: string;
  price: number;
  quantity: number;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    description,
    imageUrl,
    name,
    price,
    quantity,
  }: IRequest): Promise<Product> {
    const product = await this.productsRepository.create({
      description,
      imageUrl,
      name,
      price,
      quantity,
    });

    return product;
  }
}

export default CreateProductService;
