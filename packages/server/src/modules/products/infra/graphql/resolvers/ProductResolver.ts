import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { container } from 'tsyringe';
import { Product } from '../../typeorm/models/Product';

import ShowProductService from '../../../services/ShowProductService';

import CreateProductService from '../../../services/CreateProductService';
import ListProductsService from '../../../services/ListProductsService';
import { CreateProductInput } from '../inputs/CreateProductInput';

@Resolver()
export class ProductResolver {
  @Query(() => [Product])
  public async products(): Promise<Product[]> {
    const findProducts = container.resolve(ListProductsService);

    const products = await findProducts.execute();

    return products;
  }

  @Query(() => Product)
  public async product(@Arg('id') id: string): Promise<Product> {
    const showProduct = container.resolve(ShowProductService);
    const product = await showProduct.execute({ id });

    return product;
  }

  @Mutation(() => Product)
  public async createProduct(
    @Arg('data') data: CreateProductInput,
  ): Promise<Product> {
    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute(data);

    return product;
  }
}
