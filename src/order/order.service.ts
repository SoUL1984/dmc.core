import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}
  async createOrder(dto: CreateOrderDto, userId: number) {
    const currentYear = new Date().getFullYear().toString();
    
    let lastOrder = await this.orderRepository.findOne({
      order: [ [ 'id', 'DESC' ]],
    });
    
    let prefixOrderNum = 'А';
    let uploadFiles = '';
    if (dto.uploadFiles !== undefined) {
      uploadFiles = dto.uploadFiles;
      prefixOrderNum = 'И';
    }
    
    let orderNum:string = '000001-'+prefixOrderNum+'-'+ currentYear;
    if (lastOrder !== null) {
      const aOrderNum = lastOrder.orderNum.split('-');
      orderNum = '000001-'+prefixOrderNum+'-'+ currentYear;
      if (aOrderNum[2] == currentYear) {
        const num = Number(aOrderNum[0].replace(/[0]+/, ''));
        const fullNum = ('00000'+(num+1).toString()).slice(-6);
        orderNum = fullNum+'-'+prefixOrderNum+'-'+ currentYear;
      }
    };
    const order = await this.orderRepository.create({
      userId, 
      orderNum,
      uploadFiles,
      technician: dto.technician,
      executor_n1: dto.executor_n1,
      fittingDateN1: dto.fittingDateN1,
    });
    return order;
  }

  async getAllOrders() {
    const listOrder = await this.orderRepository.findAll();
    return listOrder;
  }
}
