import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class SelectOrderDto {
  @ApiPropertyOptional({
    example: '1',
    description: 'Номер записи',
  })
  readonly id: number;

  @ApiPropertyOptional({
    example: '000001-И-2023',
    description: 'Номер заказ-наряда',
  })
  readonly orderNum: string;

  @ApiPropertyOptional({
    example: 'Белов А.А.',
    description: 'ФИО доктора',
  })
  readonly doctorName: string;

  @ApiPropertyOptional({
    example: 'Иванов И. И.',
    description: 'ФИО пациента',
  })
  readonly pacientName: string;

  @ApiProperty({
    example: 'Макаров Е.В.',
    description: 'ФИО техника',
  })
  readonly technician: string;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Флаг выполнения заказ-наряда',
  })
  readonly isComplete: boolean;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Флаг оплаты заказ-наряда',
  })
  readonly isPayment: boolean;

  @ApiPropertyOptional({
    example: 'true',
    description:
      'Флаг,что работу можно отправить (выставляет администратор, когда узнает,что работа готова к отправке)',
  })
  readonly isDelivery: boolean;

  @ApiPropertyOptional({
    example: 'true',
    description: 'Флаг, доставка произведена',
  })
  readonly isDeliveryMade: boolean;

  @ApiProperty({
    example: '3',
    description: 'Первый исполнитель',
  })
  readonly executor_n1: number;

  @ApiPropertyOptional({
    example: '2',
    description: 'Второй исполнитель',
  })
  readonly executor_n2: number;

  @ApiPropertyOptional({
    example: '1',
    description: 'Третий исполнитель',
  })
  readonly executor_n3: number;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Дата первой примерки',
  })
  readonly fittingDateN1: Date;

  @ApiPropertyOptional({
    example: '05.12.1984',
    description: 'Дата второй примерки',
  })
  readonly fittingDateN2: Date;

  @ApiPropertyOptional({
    example: '05.12.1984',
    description: 'Дата третьей примерки',
  })
  readonly fittingDateN3: Date;
}
