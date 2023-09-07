import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BillingType } from './billing.type';
import { BillingService } from './billing.service';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
@Resolver((of) => BillingType)
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}
  @Query((returns) => [BillingType])
  async billing() {
    return this.billingService.findAll();
  }
}
