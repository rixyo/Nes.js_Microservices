import { Controller } from '@nestjs/common';
import { BillingService } from './billing.service';
import { RmqService } from '@app/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
@Controller()
export class BillingController {
  constructor(
    private readonly billingService: BillingService,
    private readonly rmqService: RmqService,
  ) {}
  @EventPattern('order_data')
  async createdOrder(@Payload() data: any, @Ctx() context: RmqContext) {
    console.log('Order created event acknowledged.');
    console.log(data.orderData);
    await this.billingService.createBilling(data.orderData);
    this.rmqService.ack(context);
  }
}
