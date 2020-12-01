import { getRepository, Repository } from 'typeorm';
import { Product } from '../models/Product';

import { IProductsRepository } from '../../../repositories/IProductsRepository';
import ICreateProductDTO from '../../../dtos/ICreateProductDTO';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({
    name,
    description,
    imageUrl,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create({
      name,
      description,
      imageUrl,
      price,
      quantity,
    });

    await product.save();

    return product;
  }

  public async save(products: Product[]): Promise<Product[]> {
    return this.ormRepository.save(products);
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByIds(ids: string[]): Promise<Product[]> {
    const products = await this.ormRepository.findByIds(ids);

    return products;
  }
}

export default ProductsRepository;
