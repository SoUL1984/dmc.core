import { IsNumber } from "class-validator";
import { IsRequired } from "src/decorator/dto.decorator";

export class CreateOrderPriceDto {
  @IsRequired('10', 'Индентификатор прайс-листа (priceId)', true)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly priceId: number;

  @IsRequired('10', 'Индентификатор заказ-наряда (orderId)', true)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly orderId: number;

  @IsRequired('10', 'Количество', true)
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly amount: number;
}
