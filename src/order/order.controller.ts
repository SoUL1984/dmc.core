import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { CurUser } from 'src/auth/user-auth.decorator';
import { EnumRole } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';
import { OrderService } from './order.service'

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

  @Get()
  getALL() {
    return this.orderService.getAllOrders();
  }
}
