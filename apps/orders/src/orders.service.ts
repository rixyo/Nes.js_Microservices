import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Order } from './orders.entity';
import { CreateOrderInput } from './orders.input';
import { BILLING_SERVICE } from './constants/services';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { InjectRepository } from '@nestjs/typeorm';
@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    @Inject(BILLING_SERVICE)
    private billingClient: ClientProxy,
  ) {}
  async findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }
  async findOne(id: string): Promise<Order> {
    return await this.orderRepository.findOne({
      where: {
        id,
      },
    });
  }
  async create(order: CreateOrderInput): Promise<Order> {
    const newOrder = this.orderRepository.create(order);
    const neworder = await this.orderRepository.save(newOrder);
    const orderData = {
      orderId: neworder.id,
      name: neworder.name,
      price: neworder.price,
      userId: neworder.userId,
    };
    await lastValueFrom(
      this.billingClient.emit('order_data', {
        orderData,
      }),
    );
    return neworder;
  }
}
