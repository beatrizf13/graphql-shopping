import { injectable, inject } from 'tsyringe';
import { Costumer } from '../infra/typeorm/models/Costumer';
import { ICostumersRepository } from '../repositories/ICostumersRepository';

@injectable()
class ListCostumersService {
  constructor(
    @inject('CostumersRepository')
    private costumersRepository: ICostumersRepository,
  ) {}

  public async execute(): Promise<Costumer[]> {
    const costumers = await this.costumersRepository.find();

    return costumers;
  }
}

export default ListCostumersService;
