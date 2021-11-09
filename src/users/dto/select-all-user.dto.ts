import { ApiProperty } from '@nestjs/swagger';

export class SelectAllUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  readonly email: string;

  @ApiProperty({ example: 'Пащенко Э.В.', description: 'ФИО пользователя' })
  readonly name: string;

  @ApiProperty({ example: 'Силовая ул., д. 4, кв. 144', description: 'Адрес' })
  readonly city: string;

  @ApiProperty({ example: 'Самара', description: 'Город' })
  readonly address: string;

  @ApiProperty({
    example: 'Привозить только вовремя',
    description: 'Дополнительное описание',
  })
  readonly desc: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  readonly phone: string;

  @ApiProperty({
    example: '05.12.1984',
    description: 'День рождение',
  })
  readonly birthday: Date;

  @ApiProperty({ example: 'customer', description: 'Роль' })
  readonly role: string;

  @ApiProperty({
    example: 'false',
    description: 'Флаг удаления Заказ-наряда',
  })
  readonly isDelete: boolean;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Последнее посещение системы',
  })
  readonly lastVisit: Date;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Последнее посещение системы',
  })
  readonly createdAt: Date;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Последнее посещение системы',
  })
  readonly updatedAt: Date;

  @ApiProperty({
    example: '05.12.1984',
    description: 'Последнее посещение системы',
  })
  readonly deletedAt: Date;
}
