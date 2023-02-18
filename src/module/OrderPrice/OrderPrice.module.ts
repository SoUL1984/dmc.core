import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from 'src/module/auth/auth.module';
import { Order } from 'src/module/order/order.entity';
import { Price } from 'src/module/price/price.entity';
import { OrderPriceController } from './OrderPrice.controller';
import { OrderPrice } from './OrderPrice.entity';
import { OrderPriceService } from './OrderPrice.service';

@Module({
    controllers: [OrderPriceController],
    providers: [OrderPriceService],
    imports: [SequelizeModule.forFeature([OrderPrice, Order, Price]), forwardRef(() => AuthModule)],
    exports: [OrderPriceService],
})
export class OrderPriceModule {}
