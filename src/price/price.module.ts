import { Module } from '@nestjs/common';
import { PriceGroupService } from './price.service';
import { PriceGroupController } from './price.controller';
import { PriceGroup } from 'src/pricegroup/pricegroup.model';
import { Price } from './price.model';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  providers: [PriceGroupService],
  controllers: [PriceGroupController],
  imports: [SequelizeModule.forFeature([Price, PriceGroup])],
})
export class PricegroupModule {}
