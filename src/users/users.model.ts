import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from 'src/order/order.model';

export enum EnumRole {
  customer = 'customer',
  dentaltechn = 'dentaltechn',
  director = 'director',
  courier = 'courier',
  admin = 'admin',
}

interface UserCreationAttrs {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Table({ tableName: 'users', paranoid: true })
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

  @ApiProperty({ example: 'Пащенко Эдуард', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Самара',
    description: 'Город',
  })
  @Column({
    type: DataType.ENUM,
    values: ['Москва', 'Санкт-Петербург', 'Самара'],
  })
  city: string;

  @ApiProperty({
    example: 'ул. Дыбенко, д. 27В',
    description: 'Адрес пользователя',
  })
  @Column({ type: DataType.STRING })
  address: string;

  @ApiProperty({
    example: 'Необходимо звонить вечером',
    description: 'Дполнительная информация',
  })
  @Column({ type: DataType.STRING })
  desc: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @ApiProperty({
    example: '05.12.1984',
    description: 'День рождение',
  })
  @Column({ type: DataType.DATE })
  birthday: Date;

  @ApiProperty({ example: 'customer', description: 'Роль' })
  @Column({
    type: DataType.ENUM,
    values: Object.values(EnumRole),
    defaultValue: EnumRole.customer,
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

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата создания',
  })
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления',
  })
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата удаления',
  })
  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @HasMany(() => Order)
  orders: Order[];
}
