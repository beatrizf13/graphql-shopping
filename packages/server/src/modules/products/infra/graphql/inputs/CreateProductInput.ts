import { InputType, Field, Int, Float } from 'type-graphql';

@InputType()
export class CreateProductInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  imageUrl: string;

  @Field(() => Float)
  price: number;

  @Field(() => Int)
  quantity: number;
}
