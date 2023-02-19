import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceDto } from './dto/create-price.dto';
import { SelectPriceDto } from './dto/select-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';

@Injectable()
export class PriceService {
  constructor(@InjectModel(Price) private priceRepository: typeof Price) {}

  async getById(priceId: number): Promise<SelectPriceDto> {
    try {
      const { id, pricegroupId, name, price, desc, isDelete } =
        await this.priceRepository.findByPk(priceId, {
          attributes: [
            'id',
            'pricegroupId',
            'name',
            'price',
            'desc',
            'isDelete',
          ],
        });
      return {
        id,
        pricegroupId,
        name,
        price,
        desc,
        isDelete,
      };
    } catch (e) {
      throw new HttpException(
        'Создать запись позиции в прайс-листе не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async createPrice(dto: CreatePriceDto): Promise<SelectPriceDto> {
    try {
      const { id, pricegroupId, name, price, desc, isDelete } =
        await this.priceRepository.create(dto);
      return {
        id,
        pricegroupId,
        name,
        price,
        desc,
        isDelete,
      };
    } catch (e) {
      throw new HttpException(
        'Создать запись позиции в прайс-листе не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllPrice(): Promise<SelectPriceDto[]> {
    try {
      return await this.priceRepository.findAll({
        attributes: ['id', 'pricegroupId', 'name', 'price', 'desc', 'isDelete'],
      });
    } catch (e) {
      throw new HttpException(
        'Получить все позиции прайс-листа не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllPriceByPriceGroupID(priceGroupId: number): Promise<SelectPriceDto[]> {
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

  async updatePriceById(
    dto: UpdatePriceDto,
    price_id: number,
  ): Promise<number> {
    try {
      const price = await this.priceRepository.findOne({
        where: { id: price_id, isDelete: false },
      });
      if (price === null) {
        throw new HttpException(
          'Позиция прайс-листа не найдена. Обновить данные не удалось.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        const [priceId] = await this.priceRepository.update(dto, {
          where: { id: price_id, isDelete: false },
        });

        return priceId;
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при изменении позиции прайс-листа. Обновить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletePriceById(id: number) {
    try {
      const price = await this.priceRepository.findOne({
        where: { id, isDelete: false },
      });
      if (price === null) {
        throw new HttpException(
          'Позиция прайс-листа не найдена. Обновить данные не удалось.',
          HttpStatus.NOT_FOUND,
        );
      } else {
        return await this.priceRepository.update(
          { isDelete: true, deletedAt: new Date() },
          { where: { id } },
        )[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении позиции из прайс-листа. Удалить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
