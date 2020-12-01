import ICreateProductDTO from '../dtos/ICreateProductDTO';
import { Product } from '../infra/typeorm/models/Product';

export interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  findById(id: string): Promise<Product>;
  findByIds(ids: string[]): Promise<Product[]>;
  find(): Promise<Product[]>;
  save(products: Product[]): Promise<Product[]>;
}
