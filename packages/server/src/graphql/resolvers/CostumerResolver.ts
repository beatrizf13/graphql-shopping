import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Costumer } from '../../typeorm/models/Costumer';

import { CreateCostumerInput } from '../inputs/CreateCostumerInput';

@Resolver()
export class CostumerResolver {
  @Query(() => [Costumer])
  costumers() {
    return Costumer.find({ relations: ['orders'] });
  }

  @Query(() => Costumer)
  costumer(@Arg('id') id: string) {
    return Costumer.findOne({ where: { id }, relations: ['orders'] });
  }

  @Mutation(() => Costumer)
  async createCostumer(@Arg('data') data: CreateCostumerInput) {
    const costumer = Costumer.create(data);

    await costumer.save();

    return costumer;
  }
}
