import { Inject, Injectable, Logger } from '@nestjs/common';

import { RmqService } from '@app/common';
import { Repository } from 'typeorm';
import { Billing } from './billing.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteBillingType } from './billing.type';
@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Billing)
    private readonly billingRepository: Repository<Billing>,
    private readonly rmqService: RmqService,
  ) {}

  async findAll(): Promise<Billing[]> {
    return await this.billingRepository.find();
  }
  async createBilling(data: any) {
    const billing = new Billing();
    billing.name = data.name;
    billing.price = data.price;
    billing.userId = data.userId;
    billing.orderId = data.orderId;
    const newBill = await this.billingRepository.save(billing);
    console.log(newBill);
    return newBill;
  }
  async getUserBilling(userId: string) {
    const billing = await this.billingRepository.find({
      where: { userId: userId },
    });
    return billing;
  }
  async deleteAll(): Promise<DeleteBillingType> {
    await this.billingRepository.clear();
    return { message: 'All records deleted' };
  }
}
