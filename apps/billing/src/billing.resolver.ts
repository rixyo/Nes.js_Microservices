import { Resolver, Query, Args } from '@nestjs/graphql';
import { BillingType } from './billing.type';
import { BillingService } from './billing.service';
import { AuthGuard, JWTUserType, User } from '@app/common';
import { UseGuards } from '@nestjs/common';
import { Role, Roles } from '@app/common/decorators/role.decorator';
@Resolver((of) => BillingType)
export class BillingResolver {
  constructor(private readonly billingService: BillingService) {}
  @Query((returns) => [BillingType])
  async billing() {
    return this.billingService.findAll();
  }
  @Query((returns) => [BillingType])
  @UseGuards(AuthGuard)
  @Roles(Role.USER)
  async userBilling(@User() user: JWTUserType) {
    return await this.billingService.getUserBilling(user.id);
  }
}
