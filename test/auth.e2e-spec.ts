import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth test E2E Test', () => {
    let app: INestApplication;
    let sJwtTokenBearer = '';

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });

    describe('Регистрация нового пользователя. POST /auth/registration', () => {
        // it('Регистрация пользователя', () =>
        //     request(app.getHttpServer())
        //         .post('/api/auth/registration')
        //         .send({
        //             email: 'pashenko@yandex.ru',
        //             password: 'volk',
        //             name: 'Пащенко Э.В.',
        //             phone: '+7 (987) 787-11-00',
        //         })
        //         .expect(201));

        it('Авторизация пользовател и получение jwt token', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'pashenko@yandex.ru',
                    password: 'volk',
                })
                .expect(201);
            // устанавливаем jwt токен для использования в последующих тестах
            const jwtToken = response.body.token;
            expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
            sJwtTokenBearer = `Bearer ${jwtToken}`;
        });

        it('Ошибочная аутентификация у пользователя не верный пароль', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({ email: 'pashenko@yandex.ru', password: 'wrong' })
                .expect(401);

            const jwtToken = response.body.token;
            expect(jwtToken).not.toBeDefined();
        });

        // пытаемся зайти под пользователем nobody@example.com, которого не существует
        it('Пользователя не существует', async () => {
            const response = await request(app.getHttpServer())
                .post('/api/auth/login')
                .send({ email: 'nobody@example.com', password: 'volk' })
                .expect(401);

            expect(response.body.token).not.toBeDefined();
        });
    });

    describe('Работа с заказами.', () => {
        it('Создать 16 заказов', async () => {
            // const aRequestForOrder = [];
            // for (let i = 0; i < 16; i++) {
            //     aRequestForOrder.push(
            //         request(app.getHttpServer())
            //             .post('/api/order/create')
            //             .send({
            //                 doctorName: 'Пуговкин В.В.',
            //                 pacientName: 'Петров П.П.',
            //                 technician: 'Васин В.В.',
            //                 color: 'A1',
            //                 executor_n1: 14,
            //                 executor_n2: 14,
            //                 executor_n3: 14,
            //                 fittingDateN1: '2022-12-15',
            //                 fittingDateN2: '2022-12-15',
            //                 fittingDateN3: '2022-12-15',
            //                 uploadFiles: 'files.stl',
            //                 desc: 'Тест',
            //                 descCourier: 'Тест 2',
            //             })
            //             .set('Authorization', sJwtTokenBearer)
            //             .expect(201)
            //     );
            // }

            //await Promise.all(aRequestForOrder);

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

            // const data = response.body;
            // expect(data).toHaveLength(0);
        });

        it('Получить все заказы пользователя', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/order/get-list-order')
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const data = response.body;
            expect(data).toHaveLength(8);
        });
    });
});
