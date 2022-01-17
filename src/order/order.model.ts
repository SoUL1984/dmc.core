import { ApiProperty } from '@nestjs/swagger';
import {
  AfterBulkDestroy,
  BelongsTo,
  BelongsToMany,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { OrderPrice } from 'src/order_price/order_price.model';
import { Price } from 'src/price/price.model';
import { User } from 'src/users/users.model';

export enum EnumColor {
  none = 'none',
  A1 = 'A1',
  A2 = 'A2',
  A3 = 'A3',
  A3_5 = 'A3,5',
  A4 = 'A4',
  B1 = 'B1',
  B2 = 'B2',
  B3 = 'B3',
  B4 = 'B4',
  C1 = 'C1',
  C2 = 'C2',
  C3 = 'C3',
  C4 = 'C4',
  D2 = 'D2',
  D3 = 'D3',
  D4 = 'D4',
  Blich = 'Blich',
}

interface OrderCreationAttrs {
  userId: number;
  orderNum: string;
  technician: string;
  executor_n1: number;
  fittingDateN1: Date;
  uploadFiles: string;
}

@Table({ tableName: 'order', paranoid: true })
export class Order extends Model<Order, OrderCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    comment: 'Индентификатор пользователя',
  })
  id: number;

  @ApiProperty({
    example: '1',
    description: 'Индентификатор пользователя который завел заказ-наряд',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    comment: 'Индентификатор пользователя который завел заказ-наряд',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ApiProperty({ example: '000001-И-2022', description: 'Номер заказ-наряда' })
  @Column({
    type: DataType.STRING(13),
    allowNull: false,
    comment: 'Номер заказ-наряда',
  })
  orderNum: string;

  @ApiProperty({ example: 'Белов А.А.', description: 'ФИО доктора' })
  @Column({
    type: DataType.STRING,
    comment: 'ФИО доктора',
  })
  doctorName: string;

  @ApiProperty({ example: 'Иванов И. И.', description: 'ФИО пациента' })
  @Column({
    type: DataType.STRING,
    comment: 'ФИО пациента',
  })
  pacientName: string;

  @ApiProperty({ example: 'Пащенко Э. В.', description: 'ФИО техника' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'ФИО техника',
  })
  technician: string;

  @ApiProperty({ example: 'А1', description: 'Цвет конструкции' })
  @Column({
    type: DataType.ENUM,
    values: Object.values(EnumColor),
    defaultValue: EnumColor.none,
    comment: 'Цвет конструкции',
  })
  color: string;

  @ApiProperty({
    example: '10.01.2021',
    description: 'Дата сдачи работы (окончательная, которая произошла)',
  })
  @Column({
    type: DataType.DATE,
    comment: 'Дата сдачи работы (окончательная, которая произошла)',
  })
  deliveryWork: Date;

  @ApiProperty({
    example: 'TODO:Написать верное значение',
    description: 'Акт выполненных работ',
  })
  @Column({
    type: DataType.STRING,
    comment: 'Акт выполненных работ',
  })
  certComplete: string;

  @ApiProperty({
    example: 'TODO:Написать верное значение',
    description: 'Факт оплаты (подтверждение оплаты)',
  })
  @Column({
    type: DataType.STRING,
    comment: 'Факт оплаты (подтверждение оплаты)',
  })
  factPayment: string;

  @ApiProperty({ example: 'true', description: 'Флаг, работа сдана' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг, работа сдана',
  })
  isComplete: boolean;

  @ApiProperty({ example: 'true', description: 'Флаг, оплаты работы' })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг, оплаты работы',
  })
  isPayment: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Флаг, работу можно отправить',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment:
      'Флаг, работу можно отправить (выставляет администратор, когда узнает,что работа готова к отправке)',
  })
  isDelivery: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Флаг, доставка произведена',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг, доставка произведена',
  })
  isDeliveryMade: boolean;

  @ApiProperty({
    example: 'TODO:Пока не знаю как и что',
    description:
      'Прикрпеленные файлы (закешированный фал и путь к нему) TODO:Продумать это',
  })
  @Column({
    type: DataType.STRING(600),
    allowNull: false,
    comment: 'Прикрпеленные файлы',
  })
  uploadFiles: string;

  @ApiProperty({
    example: 'Данный заказ-наряд не обязательно делать срочно',
    description: 'Дополнительные комментарии',
  })
  @Column({
    type: DataType.STRING(250),
    comment: 'Дополнительные комментарии',
  })
  desc: string;

  @ApiProperty({
    example: 'Код домофона 07112021',
    description: 'Коментарий для курьера',
  })
  @Column({
    type: DataType.STRING(256),
    comment: 'Коментарий для курьера',
  })
  descCourier: string;

  @ApiProperty({
    example: '12',
    description:
      'Исполнитель, который учавствовал в работе №1 (индетификатор исполнителя)',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Исполнитель, который учавствовал в работе №1',
  })
  executor_n1: number;

  @ApiProperty({
    example: '12',
    description:
      'Исполнитель, который учавствовал в работе №2 (индетификатор исполнителя)',
  })
  @Column({
    type: DataType.INTEGER,
    comment: 'Исполнитель, который учавствовал в работе №2',
  })
  executor_n2: number;

  @ApiProperty({
    example: '12',
    description:
      'Исполнитель, который учавствовал в работе №3 (индетификатор исполнителя)',
  })
  @Column({
    type: DataType.INTEGER,
    comment: 'Исполнитель, который учавствовал в работе №3',
  })
  executor_n3: number;

  @ApiProperty({
    example: '10.01.2021',
    description: 'Примерка №1',
  })
  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Примерка №1',
  })
  fittingDateN1: Date;

  @ApiProperty({
    example: '10.01.2021',
    description: 'Примерка №2',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Примерка №2',
  })
  fittingDateN2: Date;

  @ApiProperty({
    example: '10.01.2021',
    description: 'Примерка №3',
  })
  @Column({
    type: DataType.DATE,
    allowNull: true,
    comment: 'Примерка №3',
  })
  fittingDateN3: Date;

  @ApiProperty({
    example: 'false',
    description: 'Флаг удаления Заказ-наряда',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг удаления Заказ-наряда',
  })
  isDelete: boolean;

  @BelongsToMany(()=>Price,()=>OrderPrice)
  prices: Price[];

  @AfterBulkDestroy
  static async onDestroyCascadeOrderPrice(order: Order) {
      const orderId:number = order.where['id'];
      await OrderPrice.destroy({where: { orderId }});
  }
}
