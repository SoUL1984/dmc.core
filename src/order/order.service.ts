import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderPrice } from 'src/order_price/order_price.model';
import { UpdatePriceDto } from 'src/price/dto/update-price.dto';
import { Price } from 'src/price/price.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
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

  async updateOrderById(dto: UpdateOrderDto, orderId: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: orderId, isDelete: false },
      });
      console.log('order :>> ', order);
      if (order === null) {
        throw new HttpException(
          'Заказ-нард не найден. Обновить данные не удалось.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.orderRepository.update(dto, {
          where: { id: orderId, isDelete: false },
        })[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при изменении заказ-наряда. Обновить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deleteOrderById(oderId: number) {
    try {
      const order = await this.orderRepository.findOne({
        where: { id: oderId, isDelete: false },
      });
      if (order === null) {
        throw new HttpException(
          'Произошла ошибка при удалении заказ-наряда. Удалить запись не возможно.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.orderRepository.destroy({ where: { id:oderId } },
        )[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении заказ-наряда. Удалить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getFullOrders(userId:number) {
    try {
      //attributes: ['id', 'pricegroup_name', 'pricegroup_desc'],
      //attributes: ['id', 'name', 'price', 'desc'],
      const listOrders = await this.orderRepository.findAll({        
        include: [
          {
            model: OrderPrice,
            include: [{
              model: Price,
            }]
          },
        ],
        where: { isDelete: false, userId },
      });
      return listOrders;
    } catch (e) {
      throw new HttpException(
        'Получить все заказ-наряды с полными данными не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
