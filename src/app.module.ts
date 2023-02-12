import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './module/order/order.entity';
import { User } from './module/users/users.entity';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { PricegroupModule } from './module/pricegroup/pricegroup.module';
import { Price } from './module/price/price.entity';
import { PriceGroup } from './module/pricegroup/pricegroup.entity';
import { OrderPrice } from './module/order_price/order_price.entity';
import { PriceModule } from './module/price/price.module';
import { OrderModule } from './module/order/order.module';
import { OrderPriceModule } from './module/order_price/order_price.module';

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
      models: [User, PriceGroup, Price, Order, OrderPrice],
      autoLoadModels: true,
    }),
    UsersModule,
    AuthModule,
    PricegroupModule,
    PriceModule,
    OrderModule,
    OrderPriceModule,
  ],
})
export class AppModule {}
