import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './order/order.model';
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PricegroupModule } from './pricegroup/pricegroup.module';
import { Price } from './price/price.model';
import { PriceGroup } from './pricegroup/pricegroup.model';
import { OrderPrice } from './order_price/order_price.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: process.env.MYSQL_HOST,
      port: Number(process.env.MYSQL_PORT),
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DB,
      models: [User, Order, PriceGroup, Price, OrderPrice],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    PricegroupModule,
  ],
})
export class AppModule {}
