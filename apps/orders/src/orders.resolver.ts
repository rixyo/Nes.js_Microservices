import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { DeleteOrderType, OrderType } from './orders.type';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './orders.input';
import { Role, Roles } from '@app/common/decorators/role.decorator';
import { AuthGuard, JWTUserType, User } from '@app/common';
import { Req, UseGuards } from '@nestjs/common';
@Resolver((of) => OrderType)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}
  @Query((returns) => [OrderType])
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  async orders() {
    return await this.ordersService.findAll();
  }
  @Query((returns) => OrderType)
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN, Role.USER)
  async order(@Args('id') id: string) {
    return await this.ordersService.findOne(id);
  }
  @Mutation((returns) => OrderType)
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
    @User() user: JWTUserType,
    @Context() context: any,
  ) {
    const jwtToken = context.req.headers.authorization.split('Bearer ')[1];
    return await this.ordersService.create(createOrderInput, user.id, jwtToken);
  }
  @Query((returns) => [OrderType])
  @UseGuards(AuthGuard)
  @Roles(Role.ADMIN)
  async getBilling() {
    return await this.ordersService.findAll();
  }
  @Mutation((returns) => DeleteOrderType)
  async deleteAllRecords() {
    return await this.ordersService.deleteAll();
  }
}
