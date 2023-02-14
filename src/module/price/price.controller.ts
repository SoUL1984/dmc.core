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
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role-auth.decorator';
import { RoleGuard } from 'src/module/auth/role.guard';
import { EnumRole } from 'src/module/users/users.entity';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { Price } from './price.entity';
import { PriceService } from './price.service';

@ApiTags('Позиция в прайс-листе')
@Controller('price')
@UseGuards(RoleGuard)
export class PriceController {
  constructor(private readonly priceService: PriceService) {}

  @Roles('Создать позицию в прайс-листе', [Price], [EnumRole.admin])
  @Post('/create')
  create(@Body() priceDto: CreatePriceDto) {
    // const selectPriceDto: SelectPriceDto =
    //   this.priceService.createPrice(priceDto);
    //console.log('selectPriceDto :>> ', selectPriceDto);
    return this.priceService.createPrice(priceDto);
  }

  @Roles(
    'Получить все группы и позиции для прайс-листе',
    [Price],
    [
      EnumRole.admin,
      EnumRole.courier,
      EnumRole.customer,
      EnumRole.dentaltechn,
      EnumRole.director,
    ],
  )
  @Get()
  getALL() {
    const userDto = this.priceService.getAllPrice();
    return userDto;
  }

  @Roles('Изменение данных позиции в прайс-листе', [Price], [EnumRole.admin])
  @Patch(':price_id')
  update(
    @Param('price_id') price_id: number,
    @Body() priceDto: UpdatePriceDto,
  ) {
    return this.priceService.updatePriceById(priceDto, price_id);
  }

  @Roles('Удаление позиции в прайс-листе', [Price], [EnumRole.admin])
  @Delete(':price_id')
  remove(@Param('price_id') price_id: number) {
    return this.priceService.deletePriceById(price_id);
  }
}
