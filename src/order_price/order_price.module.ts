import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/order/order.model';
import { Price } from 'src/price/price.model';
import { OrderPriceController } from './order_price.controller';
import { OrderPrice } from './order_price.model';
import { OrderPriceService } from './order_price.service';

@Module({
  controllers: [OrderPriceController],
  providers: [OrderPriceService],
  imports: [
    SequelizeModule.forFeature([OrderPrice, Order, Price]), 
    forwardRef(() => AuthModule)
  ],
  exports: [OrderPriceService],
})
export class OrderPriceModule {}
