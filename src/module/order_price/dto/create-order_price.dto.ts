import { ApiProperty } from '@nestjs/swagger';
import { IsNumber } from 'class-validator';

export class CreateOrderPriceDto {
  @ApiProperty({
    example: '10',
    description: 'Индентификатор прайс-листа (priceId)',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly priceId: number;

  @ApiProperty({
    example: '10',
    description: 'Индентификатор заказ-наряда (orderId)',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly orderId: number;

  @ApiProperty({
    example: '10',
    description: 'Количество',
  })
  @IsNumber({}, { message: 'Должно быть числом' })
  readonly amount: number;
}
