import { Module } from '@nestjs/common';
import { dataSourceProviders } from './datasource.provider';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
  ],
  providers: [...dataSourceProviders],
  exports: [...dataSourceProviders],
})
export class DataSourceModule {}
