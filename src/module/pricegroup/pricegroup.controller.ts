import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/role-auth.decorator';
import { RoleGuard } from '../../module/auth/role.guard';
import { EnumRole } from '../../module/users/users.entity';
import { CreatePriceGroupDto } from './dto/create-pricegroup.dto';
import { UpdatePriceGroupDto } from './dto/update-pricegroup.dto';
import { PriceGroup } from './pricegroup.entity';
import { PriceGroupService } from './pricegroup.service';

@ApiTags('Группа для прайс-листа')
@Controller('price-group')
@UseGuards(RoleGuard)
export class PriceGroupController {
  constructor(private readonly priceGroupService: PriceGroupService) {}

  @Roles('Создать группу для прайс-листа', [PriceGroup], [EnumRole.admin])
  @Post('/create')
  create(@Body() priceGroupDto: CreatePriceGroupDto) {
    // const selectPriceGroupDto: SelectPriceGroupDto =
    //   this.priceGroupService.createPriceGroup(priceGroupDto);
    //console.log('selectPriceGroupDto :>> ', selectPriceGroupDto);
    return this.priceGroupService.createPriceGroup(priceGroupDto);
  }

  @Roles(
    'Получить все группы для прайлиста',
    [PriceGroup],
    [
      EnumRole.admin,
      EnumRole.admin,
      EnumRole.courier,
      EnumRole.customer,
      EnumRole.dentaltechn,
      EnumRole.director,
    ],
  )
  @Get()
  getALL() {
    const listPriceGroup = this.priceGroupService.getAllPriceGroup();
    return listPriceGroup;
  }

  @Roles(
    'Получить все группы и позиции для прайc-листа',
    [PriceGroup],
    [
      EnumRole.admin,
      EnumRole.courier,
      EnumRole.customer,
      EnumRole.dentaltechn,
      EnumRole.director,
    ],
  )
  @Get('/all-pricegroup-and-price')
  getAllPriceGroupAndPrice() {
    const priceGroupAndPrice =
      this.priceGroupService.getAllPriceGroupAndPrice();
    return priceGroupAndPrice;
  }

  @Roles(
    'Изменение данных группы для прайслиста',
    [PriceGroup],
    [EnumRole.admin],
  )
  @Patch(':pricegroup_id')
  async update(
    @Param('pricegroup_id') pricegroup_id: number,
    @Body() priceGroupDto: UpdatePriceGroupDto,
  ) {
    const idPriceGroup = await this.priceGroupService.updatePriceGroupById(
      priceGroupDto,
      pricegroup_id,
    );

    return this.priceGroupService.getById(idPriceGroup);
  }

  @Roles(
    'Удаление группы для прайслиста с всеми позициями из прайслиста',
    [PriceGroup],
    [EnumRole.admin],
  )
  @Delete(':pricegroup_id')
  remove(@Param('pricegroup_id') pricegroup_id: number) {
    return this.priceGroupService.deletePriceGroupById(pricegroup_id);
  }
}
