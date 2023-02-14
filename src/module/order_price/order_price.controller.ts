import {
  Body,
  Controller,
  Param,
  Post,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { UpdateOrderPriceDto } from './dto/update-order_price.dto';
import { OrderPriceService } from './order_price.service';
import { RoleGuard } from 'src/module/auth/role.guard';
import { EnumRole } from 'src/module/users/users.entity';
import { Roles } from 'src/module/auth/role-auth.decorator';
import { OrderPrice } from './order_price.entity';

@ApiTags('Заказ-наряд')
@Controller('order-price')
@UseGuards(RoleGuard)
export class OrderPriceController {
  constructor(private readonly orderPriceService: OrderPriceService) {}

  // @ApiOperation({ summary: 'Получить все позиции заказ-наряда' })
  // @ApiResponse({ status: 200, type: [OrderPrice] })
  // @Roles(
  //   EnumRole.admin,
  //   EnumRole.courier,
  //   EnumRole.customer,
  //   EnumRole.dentaltechn,
  //   EnumRole.director,
  // )
  // @UseGuards(RoleGuard)
  // @Get('/all-price-and-order-price-by-order-id/:id')
  // getAllPriceAndOrderPrice(@Param('id') orderId: number) {
  //   const priceAndOrderPrice =
  //     this.orderPriceService.getAllPriceAndOrderPriceByOrderId(orderId);
  //   return priceAndOrderPrice;
  // }

  @ApiOperation({ summary: 'Связать заказ-наряд с прайсом' })
  @ApiResponse({ status: 200, type: OrderPrice })
  @Roles(EnumRole.admin)
  @Post()
  create(@Body() orderPriceDto: CreateOrderPriceDto) {
    return this.orderPriceService.createOrderPrice(orderPriceDto);
  }

  @Roles(EnumRole.admin)
  @Patch([':priceId', ':orderId'])
  update(
    @Param('priceId') priceId: number,
    @Param('orderId') orderId: number,
    @Body() orderPriceDto: UpdateOrderPriceDto,
  ) {
    return this.orderPriceService.updateOrderPriceById(
      orderPriceDto,
      priceId,
      orderId,
    );
  }

  @Roles(EnumRole.admin)
  @Delete([':priceId', ':orderId'])
  remove(@Param('priceId') priceId: number, @Param('orderId') orderId: number) {
    return this.orderPriceService.deleteOrderPriceById(orderId, priceId);
  }
}
