import { forwardRef, Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { Price } from './price.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../../module/auth/auth.module';
import { Order } from '../../module/order/order.entity';
import { OrderPrice } from '../../module/OrderPrice/OrderPrice.entity';

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
