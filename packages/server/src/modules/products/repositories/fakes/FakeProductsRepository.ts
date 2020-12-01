import { v4 as uuid } from 'uuid';
import ICreateProductDTO from '../../dtos/ICreateProductDTO';

import { Product } from '../../infra/typeorm/models/Product';
import { IProductsRepository } from '../IProductsRepository';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create({
    description,
    imageUrl,
    name,
    price,
    quantity,
  }: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      id: uuid(),
      description,
      imageUrl,
      name,
      price,
      quantity,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.products.push(product);

    return product;
  }

  public async save(products: Product[]): Promise<Product[]> {
    const savedProducts = products.map(product => {
      const productIndex = this.products.findIndex(
        searchedProduct => searchedProduct.id === product.id,
      );

      this.products[productIndex] = product;

      return product;
    });

    return savedProducts;
  }

  public async find(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(findProduct => findProduct.id === id);

    return product;
  }

  public async findByIds(ids: string[]): Promise<Product[]> {
    const products = this.products.filter(
      product => !!ids.find(id => product.id === id),
    );

    return products;
  }
}

export default FakeProductsRepository;
