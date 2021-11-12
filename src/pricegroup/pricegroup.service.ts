import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePriceGroupDto } from './dto/create-pricegroup.dto';
import { UpdatePriceGroupDto } from './dto/update-pricegroup.dto';
import { PriceGroup } from './pricegroup.model';

@Injectable()
export class PriceGroupService {
  constructor(
    @InjectModel(PriceGroup) private priceGroupRepository: typeof PriceGroup,
  ) {}
  async createPriceGroup(dto: CreatePriceGroupDto) {
    const priceGroup = await this.priceGroupRepository.create(dto);
    return priceGroup;
  }

  async getAllPriceGroup() {
    const listPriceGroup = await this.priceGroupRepository.findAll();
    return listPriceGroup;
  }

  async updatePriceGroupById(dto: UpdatePriceGroupDto, pricegroup_id: number) {
    return await this.priceGroupRepository.update(dto, {
      where: { id: pricegroup_id, isDelete: false },
    });
  }

  async deletePriceGroupById(id: number) {
    return await this.priceGroupRepository.update(
      { isDelete: true, deletedAt: new Date() },
      { where: { id } },
    );
  }
}
