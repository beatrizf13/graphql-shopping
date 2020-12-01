import { container } from 'tsyringe';
import ProductsRepository from '../infra/typeorm/repositories/ProductsRepository';
import { IProductsRepository } from '../repositories/IProductsRepository';

container.registerSingleton<IProductsRepository>(
  'ProductsRepository',
  ProductsRepository,
);
