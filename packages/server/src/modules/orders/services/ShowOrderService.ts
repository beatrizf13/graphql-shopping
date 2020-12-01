import { injectable, inject } from 'tsyringe';
import { Order } from '../infra/typeorm/models/Order';
import { IOrdersRepository } from '../repositories/IOrdersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowOrderService {
  constructor(
    @inject('OrdersRepository')
    private ordersRepository: IOrdersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Order> {
    const order = await this.ordersRepository.findById(id);

    return order;
  }
}

export default ShowOrderService;
