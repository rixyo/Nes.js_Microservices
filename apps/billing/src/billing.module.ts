import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { RmqModule } from '@app/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { BillingController } from './billing.conroller';
import { BillingResolver } from './billing.resolver';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './datasouce/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from './billing.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        RABBIT_MQ_URI: Joi.string().required(),
        RABBIT_MQ_BILLING_QUEUE: Joi.string().required(),
        DATABASE_URL: Joi.string().required(),
      }),
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Billing]),
    RmqModule,
  ],
  providers: [BillingService, BillingResolver],
  controllers: [BillingController],
})
export class BillingModule {}
