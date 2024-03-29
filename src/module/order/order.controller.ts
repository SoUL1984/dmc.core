import { Body, Controller, Delete, Get, Param, Post, Patch, UseGuards, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/role-auth.decorator';
import { CurUser } from '../../decorator/user-auth.decorator';
import { RoleGuard } from '../..//module/auth/role.guard';
import { EnumRole } from '../../module/users/users.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { OrderService } from './order.service';

@ApiTags('Заказ-наряд')
@Controller('order')
@UseGuards(RoleGuard)
export class OrderController {
    constructor(private readonly orderService: OrderService) {}

    @Roles('Создать заказ-наряд', [Order], [EnumRole.admin, EnumRole.customer])
    @Post('/create')
    create(@CurUser() user, @Body() orderDto: CreateOrderDto) {
        const userId = user.id;
        return this.orderService.createOrder(orderDto, userId);
    }

    @Roles('Обновить заказ-наряд', [Order], [EnumRole.admin, EnumRole.customer])
    @Patch(':order_id')
    async update(@Param('order_id') orderId: number, @Body() orderDto: UpdateOrderDto) {
        return await this.orderService.updateOrderById(orderDto, orderId);
    }

    @Roles('Удаление заказ-наряд', [Order], [EnumRole.admin, EnumRole.customer])
    @Delete(':order_id')
    remove(@Param('order_id') orderId: number) {
        return this.orderService.deleteOrderById(orderId);
    }

    @Roles(
        'Получить все заказ-наряды с пагинацией на текущего пользователя',
        [Order],
        [EnumRole.admin, EnumRole.courier, EnumRole.customer, EnumRole.dentaltechn, EnumRole.director]
    )
    @Get('/get-list-order-page')
    getListOrder(@CurUser() user, @Query('page') page: number, @Query('limit') limit: number) {
        const userId = user.id;
        const aOrder = this.orderService.getListOrderWithPagination(userId, page, limit);
        return aOrder;
    }

    @Roles(
        'Получить все заказ-наряды с полными данными',
        [Order],
        [EnumRole.admin, EnumRole.courier, EnumRole.customer, EnumRole.dentaltechn, EnumRole.director]
    )
    @Get('/get-list-order-by-user-id/:user_id')
    getListOrderByUserId(@Param('user_id') userId: number) {
        const aOrder = this.orderService.getListOrder(userId);
        return aOrder;
    }

    @Roles(
        'Получить все заказ-наряды с полными данными',
        [Order],
        [EnumRole.admin, EnumRole.courier, EnumRole.customer, EnumRole.dentaltechn, EnumRole.director]
    )
    @Get('/order-and-order-price-by-id/:order_id')
    getOrderAndOrderPriceById(@Param('order_id') orderId: number) {
        const listFullOrder = this.orderService.getOrderAndOrderPriceById(orderId);
        return listFullOrder;
    }
}
