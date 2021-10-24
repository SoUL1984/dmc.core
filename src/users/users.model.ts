import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';

export enum EnumRole {
  customer,
  dentaltechn,
  director,
  courier,
  admin,
  none,
}

interface UserCreationAttrs {
  email: string;
  password: string;
  phone: string;
  role: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @ApiProperty({ example: 'customer', description: 'Роль' })
  @Column({
    type: DataType.ENUM,
    values: ['dentaltechn', 'director', 'courier', 'admin', 'none'],
    //defaultValue: EnumRole.none,
    allowNull: false,
  })
  role: string;

  @ApiProperty({ example: 'true', description: 'Признак удаленной записи' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isDelete: boolean;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата последнего посещения',
  })
  @Column({ type: DataType.DATE })
  lastVisit: Date;

  @HasMany(() => Order, 'userId')
  orders: Order[];
}
