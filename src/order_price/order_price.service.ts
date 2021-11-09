import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { OrderPrice } from './order_price.model';

@Injectable()
export class OrderPriceService {
  constructor(
    @InjectModel(OrderPrice) private orderRepository: typeof OrderPrice,
  ) {}
  async createOrderPrice(dto: CreateOrderPriceDto) {
    //const orderPrice = await this.orderRepository.create(dto);
    return null;
  }
  async getAllOrderPrices() {
    const listOrderPrice = await this.orderRepository.findAll();
    return listOrderPrice;
  }
}
