import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from '../orders.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DTABASE_URL'),
        entities: [Order],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
