import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { Order } from 'sequelize/types';

describe('Order test E2E Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });

    describe('Создание нового заказ-наряда. POST /order/create', () => {
        let sJwtTokenBearer = '';
        const sUserEmail = 'pashenko@yandex.ru';
        let idOrderForUpdate = 0;
        let vOrderForUpdate: Order = null;
        let idOrderForDelete = 0;
        let idOrderErrDelete = 0;

        it('Регистрация пользователя', () =>
            request(app.getHttpServer())
                .post('/api/auth/registration')
                .send({
                    email: 'pashenko@yandex.ru',
                    password: 'volk',
                    name: 'Пащенко Э.В.',
                    phone: '+7 (987) 787-11-00',
                })
                .expect(201));

        it('Авторизация под пользователем и получение jwt token', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: sUserEmail,
                    password: 'volk',
                })
                .expect(201);
            // устанавливаем jwt токен для использования в последующих тестах
            const jwtToken = response.body.token;
            expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
            sJwtTokenBearer = `Bearer ${jwtToken}`;
        });

        it('Создать восем разнообразных заказов на пользователя #1', async () => {
            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Пуговкин В.В.',
                    pacientName: 'Петров П.П.',
                    technician: 'Пащенко Э.В.',
                    color: 'A1',
                    executor_n1: 14,
                    executor_n2: 14,
                    executor_n3: 14,
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Василек П.И.',
                    pacientName: 'Иванов И.И.',
                    technician: 'Пащенко Э.В.',
                    color: 'A1',
                    executor_n1: 14,
                    executor_n2: 14,
                    executor_n3: 14,
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Василек П.И.',
                    pacientName: 'Иванов И.И.',
                    technician: 'Пащенко Э.В.',
                    color: 'A1',
                    executor_n1: 14,
                    executor_n2: 14,
                    executor_n3: 14,
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Георг Г.Г.',
                    pacientName: 'Петров П.П.',
                    technician: 'Васин В.В.',
                    color: 'A1',
                    executor_n1: 14,
                    executor_n2: 14,
                    executor_n3: 14,
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Пуговкин В.В.',
                    pacientName: 'Петров П.П.',
                    technician: 'Васин В.В.',
                    color: 'A1',
                    executor_n1: 14,
                    executor_n2: 14,
                    executor_n3: 14,
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Пуговкин В.В.',
                    pacientName: 'Петров П.П.',
                    technician: 'Васин В.В.',
                    color: 'A1',
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Пуговкин В.В.',
                    pacientName: 'Петров П.П.',
                    technician: 'Васин В.В.',
                    color: 'A1',
                    executor_n1: 14,
                    executor_n2: 14,
                    executor_n3: 14,
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Пуговкин В.В.',
                    pacientName: 'Петров П.П.',
                    technician: 'Васин В.В.',
                    color: 'A1',
                    fittingDateN1: '2022-12-15',
                    fittingDateN2: '2022-12-15',
                    fittingDateN3: '2022-12-15',
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);

            // const data = response.body;
            // expect(data).toHaveLength(0);
        });

        it('Получить все заказы пользователя', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/order/get-list-order')
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const data = response.body;

            // получаем ID последней записи в списке заказов
            vOrderForUpdate = data[5];
            idOrderForUpdate = data[5].id;
            idOrderErrDelete = data[6].id;
            idOrderForDelete = data[7].id;
            expect(data).toHaveLength(8);
        });

        it(`Изменить все данные заказ-наряда ${idOrderForUpdate}`, async () => {
            const response = await request(app.getHttpServer())
                .patch(`/api/order/${idOrderForUpdate}`)
                .send({
                    doctorName: 'Пользователь 1',
                    pacientName: 'Пользователь 1',
                    technician: 'Пользователь 1',
                    color: 'A1',
                    executor_n1: 10,
                    executor_n2: null,
                    executor_n3: null,
                    fittingDateN1: '2023-01-01',
                    fittingDateN2: '2023-01-01',
                    fittingDateN3: '2023-01-01',
                    uploadFiles: '',
                    desc: 'Тест 1',
                    descCourier: 'Тест тест тест',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const vOrder = response.body;

            expect(vOrder).toStrictEqual({
                ...vOrder,
                doctorName: 'Пользователь 1',
                pacientName: 'Пользователь 1',
                technician: 'Пользователь 1',
                color: 'A1',
                executor_n1: 10,
                executor_n2: null,
                executor_n3: null,
                fittingDateN1: '2023-01-01T00:00:00.000Z',
                fittingDateN2: '2023-01-01T00:00:00.000Z',
                fittingDateN3: '2023-01-01T00:00:00.000Z',
                uploadFiles: '',
                desc: 'Тест 1',
                descCourier: 'Тест тест тест',
            });
        });

        it(`Изменить часть данных заказ-наряда ${idOrderForUpdate} (после того как заказ-наряд взят в работу).`, async () => {
            const response = await request(app.getHttpServer())
                .patch(`/api/order/${idOrderForUpdate}`)
                .send({
                    doctorName: 'Пользователь 1',
                    pacientName: 'Пользователь 1',
                    technician: 'Пользователь 1',
                    color: 'A1',
                    executor_n1: 10,
                    executor_n2: 20,
                    fittingDateN1: '2023-01-01',
                    fittingDateN2: '2023-01-01',
                    fittingDateN3: '2023-01-01',
                    uploadFiles: '',
                    desc: 'Тест 1',
                    descCourier: 'Тест тест тест',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const vOrder = response.body;

            expect(vOrder).toStrictEqual({
                ...vOrder,
                doctorName: 'Пользователь 1',
                pacientName: 'Пользователь 1',
                technician: 'Пользователь 1',
                color: 'A1',
                executor_n1: 10,
                executor_n2: null,
                executor_n3: null,
                fittingDateN1: '2023-01-01T00:00:00.000Z',
                fittingDateN2: '2023-01-01T00:00:00.000Z',
                fittingDateN3: '2023-01-01T00:00:00.000Z',
                uploadFiles: '',
                desc: 'Тест 1',
                descCourier: 'Тест тест тест',
            });
        });

        it(`Удалить последний заказ под номером ${idOrderForDelete}`, async () => {
            const response = await request(app.getHttpServer())
                .delete(`/api/order/${idOrderForDelete}`)
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const sIsDelete = response.text;

            expect(sIsDelete).toBe('');
        });

        it(`Удаление заказа на который назначены исполнители под номером ${idOrderErrDelete}`, async () => {
            const response = await request(app.getHttpServer())
                .delete(`/api/order/${idOrderErrDelete}`)
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const sIsDelete = response.text;

            expect(sIsDelete).toBe('0');
        });



        // it('Сам пользователь удаляет сябя из системы если он есть', async () => {
        //     await request(app.getHttpServer())
        //         .delete(`/api/users/${sUserEmail}`)
        //         .set('Authorization', sJwtTokenBearer)
        //         .expect(200);
        // });
    });
});
