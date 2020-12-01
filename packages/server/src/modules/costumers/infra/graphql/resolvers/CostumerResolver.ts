import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { container } from 'tsyringe';

import CreateCostumerService from '../../../services/CreateCostumerService';
import { Costumer } from '../../typeorm/models/Costumer';

import ShowCostumerService from '../../../services/ShowCostumerService';
import ListCostumersService from '../../../services/ListCostumersService';
import { CreateCostumerInput } from '../inputs/CreateCostumerInput';

@Resolver()
export class CostumerResolver {
  @Query(() => [Costumer])
  public async costumers(): Promise<Costumer[]> {
    const findCostumers = container.resolve(ListCostumersService);

    const costumers = await findCostumers.execute();

    return costumers;
  }

  @Query(() => Costumer)
  public async costumer(@Arg('id') id: string): Promise<Costumer> {
    const showCostumer = container.resolve(ShowCostumerService);
    const costumer = await showCostumer.execute({ id });

    return costumer;
  }

  @Mutation(() => Costumer)
  public async createCostumer(
    @Arg('data') data: CreateCostumerInput,
  ): Promise<Costumer> {
    const createCostumer = container.resolve(CreateCostumerService);

    const costumer = await createCostumer.execute(data);

    return costumer;
  }
}
