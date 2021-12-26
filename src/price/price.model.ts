import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderPrice } from 'src/order_price/order_price.model';
import { PriceGroup } from 'src/pricegroup/pricegroup.model';

interface PriceCreationAttrs {
  pricegroupId: number;
  name: string;
  price: number;
  desc: string;
}

@Table({ tableName: 'price', paranoid: true })
export class Price extends Model<Price, PriceCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ForeignKey(() => PriceGroup)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Индентификатор группы в прайс-листе',
  })
  pricegroupId: number;

  @BelongsTo(() => PriceGroup)
  pricegroup: PriceGroup;

  @ApiProperty({
    example: 'Каркасная коронка из диоксида циркония',
    description: 'Наименования позиции в прайс-листе',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  name: string;

  @ApiProperty({
    example: '5 100.10',
    description: 'Цена позиции',
  })
  @Column({ type: DataType.DECIMAL(8, 2), allowNull: false })
  price: number;

  @ApiProperty({
    example: 'Дополнительная информация о позиции в прайсе',
    description: 'Дополнительная информация',
  })
  @Column({ type: DataType.STRING })
  desc: string;

  @ApiProperty({ example: 'true', description: 'Признак удаленной записи' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isDelete: boolean;

  @HasMany(() => OrderPrice)
  orderPrices: OrderPrice[];
}
