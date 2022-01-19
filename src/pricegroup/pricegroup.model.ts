import { ApiProperty } from '@nestjs/swagger';
import { AfterBulkDestroy, Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Price } from 'src/price/price.model';

interface PriceGroupCreationAttrs {
  pricegroup_name: string;
  pricegroup_desc: string;
}

@Table({ tableName: 'pricegroup', paranoid: true })
export class PriceGroup extends Model<PriceGroup, PriceGroupCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'Цирконий анатомический',
    description: 'Наименование группы продукции в прайслисте',
  })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  pricegroup_name: string;

  @ApiProperty({
    example:
      'Данный прайс был обсужден с заказчиком в индивидуальном порядке, ниже цены мы сделать не можем',
    description: 'Дополнительная информация',
  })
  @Column({ type: DataType.STRING })
  pricegroup_desc: string;

  @ApiProperty({ example: 'true', description: 'Признак удаленной записи' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isDelete: boolean;

  @HasMany(() => Price)
  price: Price[];

  //Каскадное удаление
  @AfterBulkDestroy
  static async onDestroyCascadePrice(pricegroup: PriceGroup) {
      const pricegroupId:number = pricegroup.where['id'];
      await Price.destroy({where: { pricegroupId }});
  }
}
