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
  name: string;
  @Field()
  role: Role;
  @Field()
  createdAt: Date;
}
@ObjectType('Token')
export class TokenType {
  @Field()
  access_token: string;
}
@ObjectType('DeleteUser')
export class DeleteUserType {
  @Field()
  message: string;
}
