import { forwardRef, Module } from '@nestjs/common';
import { PriceService } from './price.service';
import { PriceController } from './price.controller';
import { PriceGroup } from 'src/pricegroup/pricegroup.model';
import { Price } from './price.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/auth/auth.module';
import { Order } from 'src/order/order.model';
import { OrderPrice } from 'src/order_price/order_price.model';

@Module({
  providers: [PriceService],
  controllers: [PriceController],
  imports: [
    SequelizeModule.forFeature([Price, Order, OrderPrice]),
    forwardRef(() => AuthModule),
  ],
})
export class PriceModule {}
