import { Field, ID, ObjectType } from '@nestjs/graphql';
@ObjectType('Order')
export class OrderType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  userId: string;
  @Field()
  createdAt: Date;
}
