import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderService } from './order.service';

@ApiTags('Заказ-наряд')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  create(@Body() orderDto: CreateOrderDto) {
    return this.orderService.createOrder(orderDto);
  }

  @Get()
  getALL() {
    return this.orderService.getAllOrders();
  }
}
