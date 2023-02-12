import { forwardRef, Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { Price } from './price.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/module/auth/auth.module';
import { Order } from 'src/module/order/order.entity';
import { OrderPrice } from 'src/module/order_price/order_price.entity';

@Module({
  providers: [PriceService],
  controllers: [PriceController],
  imports: [
    SequelizeModule.forFeature([Price, Order, OrderPrice]),
    forwardRef(() => AuthModule),
  ],
  exports: [PriceService],
})
export class PriceModule {}
