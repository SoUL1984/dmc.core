import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { OrderPriceService } from './order_price.service';

@ApiTags('Заказ-наряд')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderPriceService) {}

  @Post()
  create(@Body() orderPriceDto: CreateOrderPriceDto) {
    return this.orderService.createOrderPrice(orderPriceDto);
  }

  @Get()
  getALL() {
    return this.orderService.getAllOrderPrices();
  }
}
