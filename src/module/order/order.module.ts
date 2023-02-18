import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/module/auth/auth.module';
import { OrderPrice } from 'src/module/OrderPrice/OrderPrice.entity';
import { Price } from 'src/module/price/price.entity';
import { OrderController } from './order.controller';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [
    SequelizeModule.forFeature([Order, Price, OrderPrice]),
    forwardRef(() => AuthModule),
  ],
  exports: [OrderService],
})
export class OrderModule {}
