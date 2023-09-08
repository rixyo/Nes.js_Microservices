import { Controller, Req, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { AuthGuard, RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { Role, Roles } from '@app/common/decorators/role.decorator';
@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}
  @EventPattern('order_data')
  @UseGuards(AuthGuard)
  @Roles(Role.USER, Role.ADMIN)
  async createdOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('Order created event acknowledged.');
    await this.billingService.createBilling(data.orderData);
    this.rmqService.ack(context);
  }
}
