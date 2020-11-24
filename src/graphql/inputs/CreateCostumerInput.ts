import { InputType, Field } from 'type-graphql';

@InputType()
export class CreateCostumerInput {
  @Field(() => String)
  name: string;
}
