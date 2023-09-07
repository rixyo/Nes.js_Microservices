import { Field, InputType } from '@nestjs/graphql';
import { MaxLength, MinLength, IsNotEmpty, IsNumber } from 'class-validator';
@InputType()
export class CreateOrderInput {
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(30)
  @Field()
  name: string;
  @IsNotEmpty()
  @IsNumber()
  @Field()
  price: number;
}
