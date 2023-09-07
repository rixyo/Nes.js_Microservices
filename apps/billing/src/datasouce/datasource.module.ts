import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Billing } from '../billing.entity';
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        port: 5433,
        entities: [Billing],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
