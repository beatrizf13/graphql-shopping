import { Order } from '../infra/typeorm/models/Order';
import ICreateOrderDTO from '../dtos/ICreateOrderDTO';

export interface IOrdersRepository {
  create(data: ICreateOrderDTO): Promise<Order>;
  save(orders: Order[]): Promise<Order | Order[]>;
  findById(id: string): Promise<Order>;
  findByCostumerId(costumerId: string): Promise<Order[]>;
}
