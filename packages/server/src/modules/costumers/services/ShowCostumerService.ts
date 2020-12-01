import { injectable, inject } from 'tsyringe';
import { Costumer } from '../infra/typeorm/models/Costumer';
import { ICostumersRepository } from '../repositories/ICostumersRepository';

interface IRequest {
  id: string;
}

@injectable()
class ShowCostumerService {
  constructor(
    @inject('CostumersRepository')
    private costumersRepository: ICostumersRepository,
  ) {}

  public async execute({ id }: IRequest): Promise<Costumer> {
    const costumer = await this.costumersRepository.findById(id);

    return costumer;
  }
}

export default ShowCostumerService;
