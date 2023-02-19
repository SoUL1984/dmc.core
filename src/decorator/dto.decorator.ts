import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

// Декоратор для обязательного поля в dto
export function IsRequired(
  sExample: string,
  sDescription: string,
  isRequired: boolean,
) {
  let decorator = null;
  if (!isRequired) {
    decorator = applyDecorators(
      ApiPropertyOptional({ example: sExample, description: sDescription }),
      IsOptional(),
    );
  } else {
    decorator = applyDecorators(
      ApiProperty({
        example: sExample,
        description: sDescription,
      }),
    );
  }

  return decorator;
}
