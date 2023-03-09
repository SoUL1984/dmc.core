import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { OrderPrice } from '../../module/OrderPrice/OrderPrice.entity';
import { Price } from '../../module/price/price.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './order.entity';
import { SelectOrderDto } from './dto/select-order.dto';
import { UpdateOrderInWorkDto } from './dto/update-order-in-work.dto';

@Injectable()
export class OrderService {
    constructor(@InjectModel(Order) private orderRepository: typeof Order) {}

    async getById(orderId: number): Promise<SelectOrderDto> {
        try {
            return await this.orderRepository.findByPk(orderId, {
                attributes: [
                    'id',
                    'orderNum',
                    'doctorName',
                    'pacientName',
                    'technician',
                    'isComplete',
                    'isPayment',
                    'isDelivery',
                    'isDeliveryMade',
                    'executor_n1',
                    'executor_n2',
                    'executor_n3',
                    'fittingDateN1',
                    'fittingDateN2',
                    'fittingDateN3',
                ],
            });
        } catch (e) {
            throw new HttpException('Не удалось получить заказ', HttpStatus.BAD_REQUEST);
        }
    }

    async createOrder(dto: CreateOrderDto, userId: number): Promise<CreateOrderDto> {
        const currentYear = new Date().getFullYear().toString();

        const lastOrder = await this.orderRepository.findOne({
            order: [['id', 'DESC']],
        });

        let prefixOrderNum = 'А';
        let uploadFiles = '';
        if (dto.uploadFiles !== undefined) {
            uploadFiles = dto.uploadFiles;
            prefixOrderNum = 'И';
        }

        let orderNum: string = '000001-' + prefixOrderNum + '-' + currentYear;
        if (lastOrder !== null) {
            const aOrderNum = lastOrder.orderNum.split('-');
            orderNum = '000001-' + prefixOrderNum + '-' + currentYear;
            if (aOrderNum[2] == currentYear) {
                const num = Number(aOrderNum[0].replace(/[0]+/, ''));
                const fullNum = ('00000' + (num + 1).toString()).slice(-6);
                orderNum = fullNum + '-' + prefixOrderNum + '-' + currentYear;
            }
        }
        // const order = await this.orderRepository.create({
        //   userId,
        //   orderNum,
        //   uploadFiles,
        //   technician: dto.technician,
        //   executor_n1: dto.executor_n1,
        //   fittingDateN1: dto.fittingDateN1,
        // });
        const order = await this.orderRepository.create({
            ...dto,
            userId,
            orderNum,
            uploadFiles,
        });

        return order;
    }

    async updateOrderById(dto: UpdateOrderDto, idOrder: number): Promise<SelectOrderDto> {
        const vOrder = await this.orderRepository.findOne({
            where: { id: idOrder, isDelete: false },
        });

        if (!vOrder) {
            throw new HttpException('Запись не найдена.', HttpStatus.NOT_FOUND);
        }

        // если не одного исполнителя не выбрано, то заказ еще пока можно удалить
        let isUpdate = 0;
        if (!(vOrder.executor_n1 || vOrder.executor_n2 || vOrder.executor_n3)) {
            // производим обновление данных
            [isUpdate] = await this.orderRepository.update(dto, {
                where: { id: idOrder, isDelete: false },
            });
        } else {
            // формируем ограниченные данные для обновления данных
            const vDtoDataInWork: UpdateOrderInWorkDto = {
                doctorName: dto.doctorName,
                pacientName: dto.pacientName,
                technician: dto.technician,
                desc: dto.desc,
                descCourier: dto.descCourier,
                fittingDateN2: dto.fittingDateN2,
                fittingDateN3: dto.fittingDateN3,
            };

            // производим обновление данных
            [isUpdate] = await this.orderRepository.update(vDtoDataInWork, {
                where: { id: idOrder, isDelete: false },
            });
        }

        const vUpdateOrder = await this.orderRepository.findOne({
            where: { id: idOrder, isDelete: false },
        });

        return vUpdateOrder;
    }

    async deleteOrderById(idOrder: number): Promise<number> {
        try {
            const vOrder = await this.orderRepository.findOne({
                where: { id: idOrder, isDelete: false },
            });
            if (!vOrder) {
                throw new HttpException('Запись не найдена.', HttpStatus.NOT_FOUND);
            }

            // если не одного исполнителя не выбрано, то заказ еще пока можно удалить
            let isDelete = 0;
            if (!(vOrder.executor_n1 || vOrder.executor_n2 || vOrder.executor_n3)) {
                isDelete = await this.orderRepository.destroy({ where: { id: idOrder }, force: true })[0];
            }

            return isDelete;
        } catch (e) {
            throw new HttpException(
                'Произошла ошибка при удалении заказ-наряда. Удалить запись не возможно.',
                HttpStatus.BAD_REQUEST
            );
        }
    }

    async getListOrder(userId: number): Promise<SelectOrderDto[]> {
        try {
            const listOrders = await this.orderRepository.findAll({
                attributes: [
                    'id',
                    'orderNum',
                    'doctorName',
                    'pacientName',
                    'technician',
                    'isComplete',
                    'isPayment',
                    'isDelivery',
                    'isDeliveryMade',
                    'executor_n1',
                    'executor_n2',
                    'executor_n3',
                    'fittingDateN1',
                    'fittingDateN2',
                    'fittingDateN3',
                ],
                where: { isDelete: false, userId },
            });

            return listOrders;
        } catch (e) {
            throw new HttpException('Получить все заказ-наряды с полными данными не удалось.', HttpStatus.BAD_REQUEST);
        }
    }

    async getOrderAndOrderPriceById(orderId: number) {
        try {
            const listOrderPriceAndPrice = await this.orderRepository.findAll({
                // attributes: ['userId',
                //              'orderNum',
                //              'doctorName',
                //              'pacientName',
                //              'technician',
                //              'isComplete',
                //              'isPayment',
                //              'isDelivery',
                //              'isDeliveryMade',
                //              'executor_n1',
                //              'executor_n2',
                //              'executor_n3',
                //              'fittingDateN1',
                //              'fittingDateN2',
                //              'fittingDateN3',
                //              'createdAt'],
                include: [
                    {
                        attributes: ['amount', 'tprice'],
                        model: OrderPrice,
                        include: [
                            {
                                attributes: ['id', 'name'],
                                model: Price,
                                where: { isDelete: false },
                            },
                        ],
                        where: { isDelete: false },
                    },
                ],
                where: { isDelete: false, id: orderId },
            });
            return { listOrderPriceAndPrice };
        } catch (e) {
            throw new HttpException('Получить все заказ-наряды с полными данными не удалось.', HttpStatus.BAD_REQUEST);
        }
    }
}
