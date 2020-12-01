import { v4 as uuid } from 'uuid';
import ICreateOrderDTO from '../../dtos/ICreateOrderDTO';

import { Order } from '../../infra/typeorm/models/Order';
import { IOrdersRepository } from '../IOrdersRepository';

class FakeOrdersRepository implements IOrdersRepository {
  private orders: Order[] = [];

  public async create({
    costumer,
    items,
    totalPrice,
  }: ICreateOrderDTO): Promise<Order> {
    const order = new Order();

    Object.assign(order, {
      id: uuid(),
      costumer,
      items,
      totalPrice,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.orders.push(order);

    return order;
  }

  public async save(orders: Order[]): Promise<Order | Order[]> {
    const savedOrders = orders.map(order => {
      const orderIndex = this.orders.findIndex(
        searchedOrder => searchedOrder.id === order.id,
      );

      this.orders[orderIndex] = order;

      return order;
    });

    return savedOrders;
  }

  public async findById(id: string): Promise<Order | undefined> {
    const order = this.orders.find(findOrder => findOrder.id === id);

    return order;
  }

  public async findByCostumerId(costumerId: string): Promise<Order[]> {
    const orders = this.orders.filter(
      order => order.costumer.id === costumerId,
    );

    return orders;
  }
}

export default FakeOrdersRepository;
