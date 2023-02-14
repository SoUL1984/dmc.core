import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/module/auth/role-auth.decorator';
import { RoleGuard } from 'src/module/auth/role.guard';
import { CurUser } from 'src/module/auth/user-auth.decorator';
import { EnumRole } from 'src/module/users/users.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';
import { or } from 'sequelize';

@ApiTags('Заказ-наряд')
@Controller('order')
@UseGuards(RoleGuard)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiOperation({ summary: 'Создать заказ-наряд' })
  @ApiResponse({ status: 200, type: Order })
  @Roles(EnumRole.admin)
  @Post('/create')
  create(@CurUser() user, @Body() orderDto: CreateOrderDto) {
    const userId = user.id;
    return this.orderService.createOrder(orderDto, userId);
  }

  @ApiOperation({ summary: 'Обновить заказ-наряд' })
  @ApiResponse({ status: 200, type: Order })
  @Roles(EnumRole.admin)
  @Put(':order_id')
  async update(@Param('order_id') orderId: number, @Body() orderDto: UpdateOrderDto) {
    const orderIdUpdated = await this.orderService.updateOrderById(orderDto, orderId);
    return await this.orderService.getById(orderIdUpdated);
  }

  @ApiOperation({
    summary: 'Удаление заказ-наряд',
  })
  @ApiResponse({ status: 200, type: [Order] })
  @Roles(EnumRole.admin)
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
  @Get('/order-and-order-price-by-id/:order_id')
  getOrderAndOrderPriceById(@Param('order_id') orderId: number) {
    const listFullOrder = this.orderService.getOrderAndOrderPriceById(orderId);
    return listFullOrder;
  }
}
