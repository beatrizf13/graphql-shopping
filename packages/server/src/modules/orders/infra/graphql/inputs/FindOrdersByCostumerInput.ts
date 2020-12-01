import { InputType, Field, ID } from 'type-graphql';

@InputType()
export class OrdersByCostumerInput {
  @Field(() => ID)
  costumerId: string;
}
