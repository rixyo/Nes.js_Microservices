import { Field, ID, ObjectType } from '@nestjs/graphql';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@ObjectType('User')
export class UserType {
  @Field(() => ID)
  id: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  name: string;
  @Field()
  role: Role;
  @Field()
  createdAt: Date;
}
