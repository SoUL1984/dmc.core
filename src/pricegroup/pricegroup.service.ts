import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceGroupDto } from './dto/create-pricegroup.dto';
import { SelectPriceGroupDto } from './dto/select-pricegroup.dto';
import { UpdatePriceGroupDto } from './dto/update-pricegroup.dto';
import { PriceGroup } from './pricegroup.model';

@Injectable()
export class PriceGroupService {
  constructor(
    @InjectModel(PriceGroup) private priceGroupRepository: typeof PriceGroup,
  ) {}
  async createPriceGroup(dto: CreatePriceGroupDto) {
    const { id, pricegroup_name, pricegroup_desc, isDelete } =
      await this.priceGroupRepository.create(dto);
    const createPriceGroup: SelectPriceGroupDto = {
      id,
      pricegroup_name,
      pricegroup_desc,
      isDelete,
    };
    return createPriceGroup;
  }

  async getAllPriceGroup() {
    const listPriceGroup = await this.priceGroupRepository.findAll({
      attributes: ['id', 'pricegroup_name', 'pricegroup_desc', 'isDelete'],
    });
    return listPriceGroup;
  }

  async updatePriceGroupById(dto: UpdatePriceGroupDto, pricegroup_id: number) {
    return await this.priceGroupRepository.update(dto, {
      where: { id: pricegroup_id, isDelete: false },
    })[0];
  }

  async deletePriceGroupById(id: number) {
    return await this.priceGroupRepository.update(
      { isDelete: true, deletedAt: new Date() },
      { where: { id } },
    )[0];
  }
}
