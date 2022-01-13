import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { randomInt } from 'crypto';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}
  async createOrder(dto: CreateOrderDto, userId: number) {
    const orderNum = 'I2022'+randomInt(100);
    const order = await this.orderRepository.create({
      userId, 
      orderNum,
      technician: dto.technician,
      executor_n1: dto.executor_n1,
      fittingDateN1: dto.fittingDateN1
    });
    return order;
  }

  async getAllOrders() {
    const listOrder = await this.orderRepository.findAll();
    return listOrder;
  }
}
