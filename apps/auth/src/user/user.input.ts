import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsEmail, IsNotEmpty } from 'class-validator';
@InputType()
export class CreateSignupInput {
  @MinLength(2)
  @MaxLength(30)
  @Field()
  name: string;
  @Field()
  @IsEmail()
  email: string;
  @Field()
  @MinLength(6)
  password: string;
}
@InputType()
export class LoginInput {
  @Field()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @Field()
  @IsNotEmpty()
  @MinLength(6)
  password: string;
}
