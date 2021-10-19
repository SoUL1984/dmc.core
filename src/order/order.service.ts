import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}
  async createOrder(dto: CreateOrderDto) {
    const order = await this.orderRepository.create(dto);
    return order;
  }
  async getAllOrders() {
    const listOrder = await this.orderRepository.findAll();
    return listOrder;
  }
}
