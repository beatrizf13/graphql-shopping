import { getRepository, Repository } from 'typeorm';
import { Costumer } from '../models/Costumer';

import { ICostumersRepository } from '../../../repositories/ICostumersRepository';

import ICreateCostumerDTO from '../../../dtos/ICreateCostumerDTO';

class CostumersRepository implements ICostumersRepository {
  private ormRepository: Repository<Costumer>;

  constructor() {
    this.ormRepository = getRepository(Costumer);
  }

  public async create({ name }: ICreateCostumerDTO): Promise<Costumer> {
    const costumer = this.ormRepository.create({ name });

    await costumer.save();

    return costumer;
  }

  public async find(): Promise<Costumer[]> {
    const costumers = await this.ormRepository.find({ relations: ['orders'] });

    return costumers;
  }

  public async findById(id: string): Promise<Costumer | undefined> {
    const costumer = await this.ormRepository.findOne(id, {
      relations: ['orders'],
    });

    return costumer;
  }
}

export default CostumersRepository;
