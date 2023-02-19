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
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/module/auth/role-auth.decorator';
import { RoleGuard } from 'src/module/auth/role.guard';
import { EnumRole } from 'src/module/users/users.entity';
import { CreatePriceGroupDto } from './dto/create-pricegroup.dto';
import { UpdatePriceGroupDto } from './dto/update-pricegroup.dto';
import { PriceGroup } from './pricegroup.entity';
import { PriceGroupService } from './pricegroup.service';

@ApiTags('Группа для прайс-листа')
@Controller('price-group')
@UseGuards(RoleGuard)
export class PriceGroupController {
  constructor(private readonly priceGroupService: PriceGroupService) {}

  @ApiOperation({ summary: 'Создать группу для прайс-листа' })
  @ApiResponse({ status: 200, type: PriceGroup })
  @Roles(EnumRole.admin)
  @Post('/create')
  create(@Body() priceGroupDto: CreatePriceGroupDto) {
    // const selectPriceGroupDto: SelectPriceGroupDto =
    //   this.priceGroupService.createPriceGroup(priceGroupDto);
    //console.log('selectPriceGroupDto :>> ', selectPriceGroupDto);
    return this.priceGroupService.createPriceGroup(priceGroupDto);
  }

  @ApiOperation({ summary: 'Получить все группы для прайлиста' })
  @ApiResponse({ status: 200, type: [PriceGroup] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @Get()
  getALL() {
    const listPriceGroup = this.priceGroupService.getAllPriceGroup();
    return listPriceGroup;
  }

  @ApiOperation({ summary: 'Получить все группы и позиции для прайc-листа' })
  @ApiResponse({ status: 200, type: [PriceGroup] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @Get('/all-pricegroup-and-price')
  getAllPriceGroupAndPrice() {
    const priceGroupAndPrice =
      this.priceGroupService.getAllPriceGroupAndPrice();
    return priceGroupAndPrice;
  }

  @ApiOperation({
    summary: 'Изменение данных группы для прайслиста',
  })
  @ApiResponse({ status: 200, type: PriceGroup })
  @Roles(EnumRole.admin)
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

  @ApiOperation({
    summary: 'Удаление группы для прайслиста с всеми позициями из прайслиста',
  })
  @ApiResponse({ status: 200, type: [PriceGroup] })
  @Roles(EnumRole.admin)
  @Delete(':pricegroup_id')
  remove(@Param('pricegroup_id') pricegroup_id: number) {
    return this.priceGroupService.deletePriceGroupById(pricegroup_id);
  }
}
