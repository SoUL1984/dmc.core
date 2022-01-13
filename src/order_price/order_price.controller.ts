import { Body, Controller, Param, Post, Patch, Delete, UseGuards, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { EnumRole } from 'src/users/users.model';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { UpdateOrderPriceDto } from './dto/update-order_price.dto';
import { OrderPrice } from './order_price.model';
import { OrderPriceService } from './order_price.service';

@ApiTags('Заказ-наряд')
@Controller('order-price')
export class OrderController {
  constructor(private orderPriceService: OrderPriceService) {}

  @ApiOperation({ summary: 'Получить все позиции заказ-наряда' })
  @ApiResponse({ status: 200, type: [OrderPrice] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @UseGuards(RoleGuard)
  @Get('/all-price-and-order-price-by-order-id/:id')
  getAllPriceAndOrderPrice(
    @Param('id') orderId:number) {
    const priceAndOrderPrice =
      this.orderPriceService.getAllPriceAndOrderPriceByOrderId(orderId);
    return priceAndOrderPrice;
  }

  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Post()
  create(@Body() orderPriceDto: CreateOrderPriceDto) {
    return this.orderPriceService.createOrderPrice(orderPriceDto);
  }

  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Patch([':priceId', ':orderId'])
  update(
    @Param('priceId') priceId: number,
    @Param('orderId') orderId: number,
    @Body() orderPriceDto: UpdateOrderPriceDto,
  ) {
    return this.orderPriceService.updateOrderPriceById(orderPriceDto, priceId, orderId);
  }

  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Delete([':priceId', ':orderId'])
  remove(
    @Param('priceId') priceId: number,
    @Param('orderId') orderId: number,
  ) {
    return this.orderPriceService.deleteOrderPriceById(orderId,priceId);
  }
}
