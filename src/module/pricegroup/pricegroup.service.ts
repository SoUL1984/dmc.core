import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Price } from '../../module/price/price.entity';
import { CreatePriceGroupDto } from './dto/create-pricegroup.dto';
import { SelectPriceGroupDto } from './dto/select-pricegroup.dto';
import { UpdatePriceGroupDto } from './dto/update-pricegroup.dto';
import { PriceGroup } from './pricegroup.entity';

@Injectable()
export class PriceGroupService {
  constructor(
    @InjectModel(PriceGroup) private priceGroupRepository: typeof PriceGroup,
  ) {}
  async createPriceGroup(dto: CreatePriceGroupDto) {
    try {
      const { id, pricegroup_name, pricegroup_desc, isDelete } =
        await this.priceGroupRepository.create(dto);
      const createPriceGroup: SelectPriceGroupDto = {
        id,
        pricegroup_name,
        pricegroup_desc,
        isDelete,
      };
      return createPriceGroup;
    } catch (e) {
      throw new HttpException(
        'Создать запись группы прайс-листа не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllPriceGroupAndPrice() {
    try {
      const listPriceGroupAndPrice = await this.priceGroupRepository.findAll({
        attributes: ['id', 'pricegroup_name', 'pricegroup_desc'],
        include: [
          {
            model: Price,
            attributes: ['id', 'name', 'price', 'desc'],
            where: { isDelete: false },
          },
        ],
        where: { isDelete: false },
      });
      return listPriceGroupAndPrice;
    } catch (e) {
      throw new HttpException(
        'Получить все группы и позиции прайс-листа не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getAllPriceGroup() {
    try {
      const listPriceGroup = await this.priceGroupRepository.findAll({
        attributes: ['id', 'pricegroup_name', 'pricegroup_desc', 'isDelete'],
      });
      return listPriceGroup;
    } catch (e) {
      throw new HttpException(
        'Получить все группы прайс-листов не удалось.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async updatePriceGroupById(dto: UpdatePriceGroupDto, pricegroup_id: number) {
    try {
      const res = await this.priceGroupRepository.update(dto, {
        where: { id: pricegroup_id, isDelete: false },
      })[0];
      return res;
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении группы прайс-листа. Обновить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async deletePriceGroupById(id: number) {
    try {
      const priceGroup = await this.priceGroupRepository.findOne({
        where: { id, isDelete: false },
      });
      if (priceGroup === null) {
        throw new NotFoundException(
          'Группа прайс-листа не найдена. Удалить данные не удалось.',
        );
      } else {
        return await this.priceGroupRepository.destroy({ where: { id } })[0];
      }
    } catch (e) {
      throw new HttpException(
        'Произошла ошибка при удалении группы прайс-листа. Удалить запись не возможно.',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
