import { getRepository, Repository } from 'typeorm';
import { Order } from '../models/Order';

import { IOrdersRepository } from '../../../repositories/IOrdersRepository';

import ICreateOrderDTO from '../../../dtos/ICreateOrderDTO';

class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create({
    costumer,
    items,
    totalPrice,
  }: ICreateOrderDTO): Promise<Order> {
    const saveOrderItens = items.map(async item => item.save());

    const savedOrderItems = await Promise.all(saveOrderItens);

    const order = this.ormRepository.create({
      costumer,
      items: savedOrderItems,
      totalPrice,
    });

    await order.save();

    return order;
  }

  public async save(orders: Order[]): Promise<Order | Order[]> {
    return this.ormRepository.save(orders);
  }

  public async findByCostumerId(costumerId: string): Promise<Order[]> {
    const orders = await this.ormRepository.find({
      where: {
        costumer: {
          id: costumerId,
        },
      },
      relations: ['costumer', 'items'],
    });

    return orders;
  }

  public async findById(id: string): Promise<Order> {
    const order = await this.ormRepository.findOne(id, {
      relations: ['costumer', 'items'],
    });

    return order;
  }
}

export default OrdersRepository;
