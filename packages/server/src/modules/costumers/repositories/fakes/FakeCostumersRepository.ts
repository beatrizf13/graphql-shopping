import { v4 as uuid } from 'uuid';
import ICreateCostumerDTO from '../../dtos/ICreateCostumerDTO';

import { Costumer } from '../../infra/typeorm/models/Costumer';
import { ICostumersRepository } from '../ICostumersRepository';

class FakeCostumersRepository implements ICostumersRepository {
  private costumers: Costumer[] = [];

  public async create({ name }: ICreateCostumerDTO): Promise<Costumer> {
    const costumer = new Costumer();

    Object.assign(costumer, {
      id: uuid(),
      name,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    this.costumers.push(costumer);

    return costumer;
  }

  public async findById(id: string): Promise<Costumer | undefined> {
    const costumer = this.costumers.find(
      findCostumer => findCostumer.id === id,
    );

    return costumer;
  }

  public async find(): Promise<Costumer[]> {
    return this.costumers;
  }
}

export default FakeCostumersRepository;
