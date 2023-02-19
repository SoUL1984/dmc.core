import { forwardRef, Module } from '@nestjs/common';
import { PriceGroupService } from './pricegroup.service';
import { PriceGroupController } from './pricegroup.controller';
import { PriceGroup } from './pricegroup.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthModule } from '../../module/auth/auth.module';

@Module({
  providers: [PriceGroupService],
  controllers: [PriceGroupController],
  imports: [
    SequelizeModule.forFeature([PriceGroup]),
    forwardRef(() => AuthModule),
  ],
  exports: [PriceGroupService],
})
export class PricegroupModule {}
