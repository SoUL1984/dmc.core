import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrderPrice } from 'src/order_price/order_price.model';
import { Price } from 'src/price/price.model';
import { OrderController } from './order.controller';
import { Order } from './order.model';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [SequelizeModule.forFeature([Order, Price, OrderPrice])],
})
export class UsersModule {}
