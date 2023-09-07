import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.enity';
import { GraphQLUserInterceptor, RmqModule, UserModule } from '@app/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: './apps/auth/.env',
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      context: ({ req }) => ({ req }),
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([User]),
    RmqModule,
    UserModule,
  ],
  providers: [
    AuthService,
    AuthResolver,
    {
      provide: APP_INTERCEPTOR,
      useClass: GraphQLUserInterceptor,
    },
  ],
})
export class AuthModule {}
