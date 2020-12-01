import { injectable, inject } from 'tsyringe';
import { Order } from '../infra/typeorm/models/Order';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

interface IRequest {
  costumerId: string;
}

@injectable()
class ListOrdersByCostumerService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ costumerId }: IRequest): Promise<Order[]> {
    const orders = await this.ordersRepository.findByCostumerId(costumerId);

    return orders;
  }
}

export default ListOrdersByCostumerService;
