import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Price } from 'src/price/price.model';
import { CreateOrderPriceDto } from './dto/create-order_price.dto';
import { UpdateOrderPriceDto } from './dto/update-order_price.dto';
import { OrderPrice } from './order_price.model';

@Injectable()
export class OrderPriceService {
  constructor(
    @InjectModel(OrderPrice) private orderPriceRepository: typeof OrderPrice,
    @InjectModel(Price) private priceRepository: typeof Price,
  ) {}
  async deleteOrderPriceById(orderId: number, priceId:number) {
    try {
      const orderPrice = await this.orderPriceRepository.findOne({
        where: { orderId, priceId , isDelete: false },
      });
      if (orderPrice === null) {
        throw new HttpException(
          'Позиция в связующей таблицы order_price не найдена. Удалить данные не удалось.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.orderPriceRepository.destroy({ where: { orderId, priceId } })[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении позиции в связующей таблицы order_price. Удалить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createOrderPrice(dto:CreateOrderPriceDto) {
    const tprice = await this.priceRepository.findByPk(dto.priceId, {attributes:['price']})[0];
    const orderPrice = await this.orderPriceRepository.create({
      priceId: dto.priceId, 
      orderId: dto.orderId,
      amount:dto.amount,
      tprice
    });
    return orderPrice;
  }

  async updateOrderPriceById(dto: UpdateOrderPriceDto, priceId: number, orderId: number) {
    try {
      const orderPrice = await this.orderPriceRepository.findOne({
        where: { priceId, orderId, isDelete: false },
      });
      if (orderPrice === null) {
        throw new HttpException(
          'Позиция в связующей таблице не найдена. Обновить данные не удалось.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.orderPriceRepository.update(dto, {
          where: { priceId, orderId, isDelete: false },
        })[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при изменении в связующей таблице. Обновить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

}
