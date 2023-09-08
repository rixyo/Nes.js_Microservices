import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('Billing')
export class BillingType {
  @Field(() => ID)
  id: string;
  @Field()
  name: string;
  @Field()
  price: number;
  @Field()
  userId: string;
  @Field()
  orderId: string;
  @Field()
  createdAt: Date;
}
@ObjectType('DeleteBilling')
export class DeleteBillingType {
  @Field()
  message: string;
}
