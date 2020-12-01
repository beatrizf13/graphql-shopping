import ICreateCostumerDTO from '../dtos/ICreateCostumerDTO';

import { Costumer } from '../infra/typeorm/models/Costumer';

export interface ICostumersRepository {
  create(data: ICreateCostumerDTO): Promise<Costumer>;
  findById(id: string): Promise<Costumer | undefined>;
  find(): Promise<Costumer[]>;
}
