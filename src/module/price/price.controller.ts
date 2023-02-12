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
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { EnumRole } from 'src/module/users/users.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';
import { PriceService } from './price.service';

@ApiTags('Позиция в прайс-листе')
@Controller('price')
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @ApiOperation({ summary: 'Создать позицию в прайс-листе' })
  @ApiResponse({ status: 200, type: [Price] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Post('/create')
  create(@Body() priceDto: CreatePriceDto) {
    // const selectPriceDto: SelectPriceDto =
    //   this.priceService.createPrice(priceDto);
    //console.log('selectPriceDto :>> ', selectPriceDto);
    return this.priceService.createPrice(priceDto);
  }

  @ApiOperation({ summary: 'Получить все группы и позиции для прайс-листе' })
  @ApiResponse({ status: 200, type: [Price] })
  @UseGuards(RoleGuard)
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
    const userDto = this.priceService.getAllPrice();
    return userDto;
  }

  @ApiOperation({
    summary: 'Изменение данных позиции в прайс-листе',
  })
  @ApiResponse({ status: 200, type: [Price] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Patch(':price_id')
  update(
    @Param('price_id') price_id: number,
    @Body() priceDto: UpdatePriceDto,
  ) {
    return this.priceService.updatePriceById(priceDto, price_id);
  }

  @ApiOperation({
    summary: 'Удаление позиции в прайс-листе',
  })
  @ApiResponse({ status: 200, type: [Price] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Delete(':price_id')
  remove(@Param('price_id') price_id: number) {
    return this.priceService.deletePriceById(price_id);
  }
}
