import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCostumerInput {
  @Field()
  name: string;
}
