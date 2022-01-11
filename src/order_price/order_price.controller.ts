import { Body, Controller, Get, Param, Post, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { UpdateOrderPriceDto } from './dto/update-order_price.dto';
import { OrderPriceService } from './order_price.service';

@ApiTags('Заказ-наряд')
@Controller('order')
export class OrderController {
  constructor(private orderPriceService: OrderPriceService) {}

  @Post()
  create(@Body() orderPriceDto: CreateOrderPriceDto) {
    return this.orderPriceService.createOrderPrice(orderPriceDto);
  }


  @Patch([':priceId', ':orderId'])
  update(
    @Param('priceId') priceId: number,
    @Param('orderId') orderId: number,
    @Body() orderPriceDto: UpdateOrderPriceDto,
  ) {
    return this.orderPriceService.updateOrderPriceById(orderPriceDto, priceId, orderId);
  }


}
