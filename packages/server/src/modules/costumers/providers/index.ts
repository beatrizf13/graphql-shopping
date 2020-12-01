import { container } from 'tsyringe';
import CostumersRepository from '../infra/typeorm/repositories/CostumersRepository';
import { ICostumersRepository } from '../repositories/ICostumersRepository';

container.registerSingleton<ICostumersRepository>(
  'CostumersRepository',
  CostumersRepository,
);
