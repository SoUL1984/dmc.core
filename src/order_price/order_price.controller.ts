import { Body, Controller, Param, Post, Patch, Delete, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { EnumRole } from 'src/users/users.model';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { UpdateOrderPriceDto } from './dto/update-order_price.dto';
import { OrderPriceService } from './order_price.service';

@ApiTags('Заказ-наряд')
@Controller('order')
export class OrderController {
  constructor(private orderPriceService: OrderPriceService) {}

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
