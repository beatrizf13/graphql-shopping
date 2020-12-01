import { injectable, inject } from 'tsyringe';
import { Costumer } from '../infra/typeorm/models/Costumer';
import { ICostumersRepository } from '../repositories/ICostumersRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateCostumerService {
  constructor(
    @inject('CostumersRepository')
    private costumersRepository: ICostumersRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Costumer> {
    const costumer = await this.costumersRepository.create({ name });

    return costumer;
  }
}

export default CreateCostumerService;
