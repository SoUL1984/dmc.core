import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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
export class PriceGroupController {
  constructor(private readonly priceGroupService: PriceGroupService) {}

  @ApiOperation({ summary: 'Создать группу для прайс-листа' })
  @ApiResponse({ status: 200, type: [PriceGroup] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
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
  @UseGuards(RoleGuard)
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
  @UseGuards(RoleGuard)
  @Get('/all-pricegroup-and-price')
  getAllPriceGroupAndPrice() {
    const priceGroupAndPrice =
      this.priceGroupService.getAllPriceGroupAndPrice();
    return priceGroupAndPrice;
  }

  @ApiOperation({
    summary: 'Изменение данных группы для прайслиста',
  })
  @ApiResponse({ status: 200, type: [PriceGroup] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Patch(':pricegroup_id')
  update(
    @Param('pricegroup_id') pricegroup_id: number,
    @Body() priceGroupDto: UpdatePriceGroupDto,
  ) {
    return this.priceGroupService.updatePriceGroupById(
      priceGroupDto,
      pricegroup_id,
    );
  }

  @ApiOperation({
    summary: 'Удаление группы для прайслиста с всеми позициями из прайслиста',
  })
  @ApiResponse({ status: 200, type: [PriceGroup] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Delete(':pricegroup_id')
  remove(@Param('pricegroup_id') pricegroup_id: number) {
    return this.priceGroupService.deletePriceGroupById(pricegroup_id);
  }
}
