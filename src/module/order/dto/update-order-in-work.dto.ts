import { IsString } from 'class-validator';
import { IsRequired } from '../../../decorator/dto.decorator';

export class UpdateOrderInWorkDto {
    @IsRequired('Белов А.А.', 'ФИО доктора', false)
    @IsString({ message: 'Должно быть строкой' })
    readonly doctorName: string;

    @IsRequired('Иванов И. И.', 'ФИО пациента', false)
    @IsString({ message: 'Должно быть строкой' })
    readonly pacientName: string;

    @IsRequired('Макаров Е.В.', 'ФИО техника', false)
    @IsString({ message: 'Должно быть строкой' })
    readonly technician: string;

    @IsRequired('Данный заказ-наряд не обязательно делать срочно', 'Дополнительные комментарии', false)
    @IsString({ message: 'Должно быть строкой' })
    readonly desc: string;

    @IsRequired('Код домофона 07112021', 'Коментарий для курьера', false)
    @IsString({ message: 'Должно быть строкой' })
    descCourier: string;

    @IsRequired('05.12.1984', 'Дата второй примерки', false)
    @IsString({ message: 'Должно быть строкой' })
    readonly fittingDateN2: Date;

    @IsRequired('05.12.1984', 'Дата третьей примерки', false)
    @IsString({ message: 'Должно быть строкой' })
    readonly fittingDateN3: Date;
}
