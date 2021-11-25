import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { SelectPriceDto } from './dto/select-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.model';

@Injectable()
export class PriceService {
  constructor(@InjectModel(Price) private priceRepository: typeof Price) {}
  async createPrice(dto: CreatePriceDto) {
    try {
      const { id, pricegroupId, name, price, desc, isDelete } =
        await this.priceRepository.create(dto);
      const createPrice: SelectPriceDto = {
        id,
        pricegroupId,
        name,
        price,
        desc,
        isDelete,
      };
      return createPrice;
    } catch (e) {
      throw new HttpException(
        'Создать запись позиции в прайс-листе не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllPrice() {
    try {
      const listPrice = await this.priceRepository.findAll({
        attributes: ['id', 'pricegroupId', 'name', 'price', 'desc', 'isDelete'],
      });
      return listPrice;
    } catch (e) {
      throw new HttpException(
        'Получить все позиции прайс-листа не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllPriceByPriceGroupID(priceGroupId: number) {
    try {
      const listPrice = await this.priceRepository.findAll({
        attributes: ['id', 'pricegroupId', 'name', 'price', 'desc', 'isDelete'],
        where: { pricegroupId: priceGroupId },
      });
      return listPrice;
    } catch (e) {
      throw new HttpException(
        'Получить все позиции прайс-листа по индентификатору группы не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePriceById(dto: UpdatePriceDto, price_id: number) {
    const existing = await this.priceRepository.findOne({
      where: { id: price_id, isDelete: false },
    });
    if (existing === undefined || existing === null) {
      throw new HttpException(
        'Произошла ошибка при удалении позиции прайс-листа. Обновить запись не возможно.',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return await this.priceRepository.update(dto, {
        where: { id: price_id, isDelete: false },
      })[0];
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при изменении позиции прайс-листа. Обновить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletePriceById(id: number) {
    const existing = await this.priceRepository.findOne({
      where: { id, isDelete: false },
    });
    if (existing === undefined || existing === null) {
      throw new HttpException(
        'Произошла ошибка при удалении позиции прайс-листа. Удалить запись не возможно.',
        HttpStatus.NOT_FOUND,
      );
    }

    try {
      return await this.priceRepository.update(
        { isDelete: true, deletedAt: new Date() },
        { where: { id } },
      )[0];
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении позиции из прайс-листа. Удалить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
