import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { Order } from 'src/order/order.model';
import { Price } from 'src/price/price.model';

interface OrderPriceCreationAttrs {
  priceId: number;
  orderId: number;
  amount: number;
  tprice: number;
}

@Table({ tableName: 'order_price', paranoid: true })
export class OrderPrice extends Model<OrderPrice, OrderPriceCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
    comment: 'Индентификатор связи заказ-наряд и прайс',
  })
  id: number;

  @ForeignKey(() => Price)
  @Column({
    type: DataType.INTEGER,
    comment: 'Индентификатор прайса',
  })
  priceId: number;

  @BelongsTo(() => Price)
  price: Price;

  @ForeignKey(() => Order)
  @Column({
    type: DataType.INTEGER,
    comment: 'Индентификатор заказ-наряда',
  })
  orderId: number;

  @BelongsTo(() => Order)
  order: Order;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    comment: 'Количество выбранных позиций',
  })
  amount: number;

  @Column({
    type: DataType.DECIMAL(8, 2),
    allowNull: false,
    comment: 'Цена позиции на текущий момент времени',
  })
  tprice: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
    comment: 'Флаг удаления связи заказ-наряда___прайс',
  })
  isDelete: boolean;
}
