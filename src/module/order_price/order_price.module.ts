import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/module/order/order.entity';
import { Price } from 'src/module/price/price.entity';
import { OrderPriceController } from './order_price.controller';
import { OrderPrice } from './order_price.entity';
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
