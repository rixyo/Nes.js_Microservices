import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { OrderType } from './orders.type';
import { OrdersService } from './orders.service';
import { CreateOrderInput } from './orders.input';
@Resolver((of) => OrderType)
export class OrdersResolver {
  constructor(private readonly ordersService: OrdersService) {}
  @Query((returns) => [OrderType])
  async orders() {
    return await this.ordersService.findAll();
  }
  @Query((returns) => OrderType)
  async order(@Args('id') id: string) {
    return await this.ordersService.findOne(id);
  }
  @Mutation((returns) => OrderType)
  async createOrder(
    @Args('createOrderInput') createOrderInput: CreateOrderInput,
  ) {
    return await this.ordersService.create(createOrderInput);
  }
  @Query((returns) => [OrderType])
  async getBilling() {
    return await this.ordersService.findAll();
  }
}
