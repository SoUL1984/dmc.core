import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderPrice } from '../../module/OrderPrice/OrderPrice.entity';
import { Price } from '../../module/price/price.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order) private orderRepository: typeof Order) {}
  async createOrder(dto: CreateOrderDto, userId: number) {
    const currentYear = new Date().getFullYear().toString();

    const lastOrder = await this.orderRepository.findOne({
      order: [['id', 'DESC']],
    });

    let prefixOrderNum = 'А';
    let uploadFiles = '';
    if (dto.uploadFiles !== undefined) {
      uploadFiles = dto.uploadFiles;
      prefixOrderNum = 'И';
    }

    let orderNum: string = '000001-' + prefixOrderNum + '-' + currentYear;
    if (lastOrder !== null) {
      const aOrderNum = lastOrder.orderNum.split('-');
      orderNum = '000001-' + prefixOrderNum + '-' + currentYear;
      if (aOrderNum[2] == currentYear) {
        const num = Number(aOrderNum[0].replace(/[0]+/, ''));
        const fullNum = ('00000' + (num + 1).toString()).slice(-6);
        orderNum = fullNum + '-' + prefixOrderNum + '-' + currentYear;
      }
    }
    // const order = await this.orderRepository.create({
    //   userId,
    //   orderNum,
    //   uploadFiles,
    //   technician: dto.technician,
    //   executor_n1: dto.executor_n1,
    //   fittingDateN1: dto.fittingDateN1,
    // });
    const order = await this.orderRepository.create({
      ...dto,
      userId,
      orderNum,
      uploadFiles,
    });

    return order;
  }

  async updateOrderById(dto: UpdateOrderDto, orderId: number) {
    try {
      // производим обновление данных
      const order = await this.orderRepository.update(dto, {
        where: { id: orderId, isDelete: false },
      })[0];

      return order;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при обновлении данных заказ-наряда. Обновить запись не удалось.',
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
        return await this.orderRepository.destroy({ where: { id: oderId } })[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении заказ-наряда. Удалить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getListOrder(userId: number) {
    try {
      const listOrders = await this.orderRepository.findAll({
        attributes: [
          'id',
          'orderNum',
          'doctorName',
          'pacientName',
          'technician',
          'isComplete',
          'isPayment',
          'isDelivery',
          'isDeliveryMade',
          'executor_n1',
          'executor_n2',
          'executor_n3',
          'fittingDateN1',
          'fittingDateN2',
          'fittingDateN3',
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

  async getOrderAndOrderPriceById(orderId: number) {
    try {
      const listOrderPriceAndPrice = await this.orderRepository.findAll({
        // attributes: ['userId',
        //              'orderNum',
        //              'doctorName',
        //              'pacientName',
        //              'technician',
        //              'isComplete',
        //              'isPayment',
        //              'isDelivery',
        //              'isDeliveryMade',
        //              'executor_n1',
        //              'executor_n2',
        //              'executor_n3',
        //              'fittingDateN1',
        //              'fittingDateN2',
        //              'fittingDateN3',
        //              'createdAt'],
        include: [
          {
            attributes: ['amount', 'tprice'],
            model: OrderPrice,
            include: [
              {
                attributes: ['id', 'name'],
                model: Price,
                where: { isDelete: false },
              },
            ],
            where: { isDelete: false },
          },
        ],
        where: { isDelete: false, id: orderId },
      });
      return { listOrderPriceAndPrice };
    } catch (e) {
      throw new HttpException(
        'Получить все заказ-наряды с полными данными не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
