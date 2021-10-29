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
  technician: string;
  executor_n1: number;
}

@Table({ tableName: 'order', paranoid: true })
export class Order extends Model<Order, OrderCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    comment: 'Индентификатор пользователя',
  })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    comment: 'Индентификатор пользователя который завел заказ-наряд',
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  // @Column({
  //   type: DataType.DATE,
  //   defaultValue: NOW,
  //   comment: 'Дата и время создания заказ-наряда',
  // })
  // dateOrder: Date;

  @Column({
    type: DataType.STRING,
    comment: 'ФИО доктора',
  })
  doctorName: string;

  @Column({
    type: DataType.STRING,
    comment: 'ФИО пациента',
  })
  pacientName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'ФИО техника',
  })
  technician: string;

  @Column({
    type: DataType.ENUM,
    values: [
      'none',
      'A1',
      'A2',
      'A3',
      'A3,5',
      'A4',
      'B1',
      'B2',
      'B3',
      'B4',
      'C1',
      'C2',
      'C3',
      'C4',
      'D2',
      'D3',
      'D4',
      'Blich',
    ],
    defaultValue: EnumColor.none,
    comment: 'Цвет конструкции',
  })
  color: string;

  @Column({
    type: DataType.DATE,
    comment: 'Дата сдачи работы (окончательная, которая произошла)',
  })
  deliveryWork: Date;

  @Column({
    type: DataType.STRING,
    comment: 'Акт выполненных работ',
  })
  certComplete: string;

  @Column({
    type: DataType.STRING,
    comment: 'Факт оплаты (подтверждение оплаты)',
  })
  factPayment: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг, работа сдана',
  })
  isComplete: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг, оплаты работы',
  })
  isPayment: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment:
      'Флаг, работу можно отправить (выставляет администратор, когда узнает,что работа готова к отправке)',
  })
  isDelivery: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг, доставка произведена',
  })
  isDeliveryMade: boolean;

  @Column({
    type: DataType.STRING(600),
    comment: 'Прикрпеленные файлы',
  })
  uploadFiles: string;

  @Column({
    type: DataType.STRING(250),
    comment: 'Дополнительные комментарии',
  })
  desc: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Исполнитель, который учавствовал в работе №1',
  })
  executor_n1: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'Исполнитель, который учавствовал в работе №2',
  })
  executor_n2: number;

  @Column({
    type: DataType.INTEGER,
    comment: 'Исполнитель, который учавствовал в работе №3',
  })
  executor_n3: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Примерка №1',
  })
  fittingDateN1: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Примерка №2',
  })
  fittingDateN2: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    comment: 'Примерка №3',
  })
  fittingDateN3: Date;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
    comment: 'Флаг удаления Заказ-наряда',
  })
  isDelete: boolean;

  @HasMany(() => OrderPrice)
  orderPrices: OrderPrice[];
}
