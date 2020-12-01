import { Resolver, Query, Mutation, Arg } from 'type-graphql';

import { container } from 'tsyringe';

import { Order } from '../../typeorm/models/Order';
import ShowOrderService from '../../../services/ShowOrderService';
import ListOrdersByCostumerService from '../../../services/ListOrdersByCostumerService';
import CreateOrderService from '../../../services/CreateOrderService';
import { CreateOrderInput } from '../inputs/CreateOrderInput';
import { OrdersByCostumerInput } from '../inputs/FindOrdersByCostumerInput';

@Resolver()
export class OrderResolver {
  @Query(() => [Order])
  public async ordersByCostumer(
    @Arg('data') data: OrdersByCostumerInput,
  ): Promise<Order[]> {
    const listOrdersByCompany = container.resolve(ListOrdersByCostumerService);

    const orders = await listOrdersByCompany.execute(data);

    return orders;
  }

  @Query(() => Order)
  public async order(@Arg('id') id: string): Promise<Order> {
    const showOrder = container.resolve(ShowOrderService);

    const order = await showOrder.execute({ id });

    return order;
  }

  @Mutation(() => Order)
  public async createOrder(
    @Arg('data') data: CreateOrderInput,
  ): Promise<Order> {
    const createOrder = container.resolve(CreateOrderService);

    const order = await createOrder.execute(data);

    return order;
  }
}
