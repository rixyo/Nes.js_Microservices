import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export interface JWTUserType {
  id: string;
  iat: number;
  exp: number;
}

export const User = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getContext().req.user);
    return ctx.getContext().req.user as JWTUserType;
  },
);
