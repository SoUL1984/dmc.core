import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from 'src/order/order.model';
import { Price } from 'src/price/price.model';
import { OrderController } from './order_price.controller';
import { OrderPrice } from './order_price.model';
import { OrderPriceService } from './order_price.service';

@Module({
  controllers: [OrderController],
  providers: [OrderPriceService],
  imports: [SequelizeModule.forFeature([OrderPrice, Order, Price])],
})
export class UsersModule {}