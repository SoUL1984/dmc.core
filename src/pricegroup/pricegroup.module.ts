import { Module } from '@nestjs/common';
import { PriceGroupService } from './pricegroup.service';
import { PriceGroupController } from './pricegroup.controller';

@Module({
  providers: [PriceGroupService],
  controllers: [PriceGroupController],
})
export class PricegroupModule {}
