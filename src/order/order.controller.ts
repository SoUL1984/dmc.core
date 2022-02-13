import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { CurUser } from 'src/auth/user-auth.decorator';
import { EnumRole } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.model';
import { OrderService } from './order.service';

@ApiTags('Заказ-наряд')
@Controller('order')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @ApiOperation({ summary: 'Создать заказ-наряд' })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Post('/create')
  create(@CurUser() user, @Body() orderDto: CreateOrderDto) {
    const userId = user.id;
    return this.orderService.createOrder(orderDto, userId);
  }

  @ApiOperation({ summary: 'Обновить заказ-наряд' })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Patch(':order_id')
  update(@Param('order_id') orderId: number, @Body() orderDto: UpdateOrderDto) {
    return this.orderService.updateOrderById(orderDto, orderId);
  }

  @ApiOperation({
    summary: 'Удаление заказ-наряд',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Delete(':order_id')
  remove(@Param('order_id') orderId: number) {
    return this.orderService.deleteOrderById(orderId);
  }

  @ApiOperation({ summary: 'Получить все заказ-наряды с полными данными' })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @UseGuards(RoleGuard)
  @Get('/get-list-order')
  getListOrder(@CurUser() user) {
    const userId = user.id;
    const aOrder = this.orderService.getListOrder(userId);
    return aOrder;
  }

  @ApiOperation({ summary: 'Получить все заказ-наряды с полными данными' })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @UseGuards(RoleGuard)
  @Get('/get-list-order-by-user-id/:user_id')
  getListOrderByUserId(@Param('user_id') userId: number) {
    const aOrder = this.orderService.getListOrder(userId);
    return aOrder;
  }

  @ApiOperation({ summary: 'Получить все заказ-наряды с полными данными' })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @UseGuards(RoleGuard)
  @Get('/order-and-order-price-by-id/:order_id')
  getOrderAndOrderPriceById(@Param('order_id') orderId: number) {
    const listFullOrder = this.orderService.getOrderAndOrderPriceById(orderId);
    return listFullOrder;
  }
}
