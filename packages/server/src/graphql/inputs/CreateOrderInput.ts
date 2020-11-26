import {
  InputType, Field, Int, ID,
} from 'type-graphql';

@InputType()
class Item {
  @Field(() => ID)
  productId: string;

  @Field(() => Int)
  quantity: number;
}

@InputType()
export class CreateOrderInput {
  @Field(() => ID)
  costumerId: string;

  @Field(() => [Item])
  items: Item[];
}
