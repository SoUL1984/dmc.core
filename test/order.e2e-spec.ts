import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DeletedAt } from 'sequelize-typescript';

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
                    role: 'admin',
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
        });

        it('Получить все заказы пользователя', async () => {
            const response = await request(app.getHttpServer())
                .get('/api/order/get-list-order-page?page=0&limit=20')
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const data = response.body.rows;

            // получаем ID последней записи в списке заказов
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

        it('Создаем заказы с корректными данными.', async () => {
            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    technician: 'Пащенко Э.В.',
                    fittingDateN1: '2022-12-15',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);
        });

        it('Создаем заказы с некорректными данными. Незаполненно поле техника.', async () => {
            await request(app.getHttpServer())
                .post('/api/order/create')
                .send({
                    doctorName: 'Василек П.И.',
                    pacientName: 'Иванов И.И.',
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
                .expect(500);
        });

        it('Создаем заказы с некорректными данными. Дата первой примерки.', async () => {
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
                    uploadFiles: 'files.stl',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(500);
        });

        it('Создаем еще 17 заказ-нарядов на этого пользователя.', async () => {
            // #1
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

            // #2
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

            // #3
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

            // #4
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

            // #5
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

            // #6
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

            // #7
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

            // #8
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

            // #9
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

            // #10
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

            // #11
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

            // #12
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

            // #13
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

            // #14
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

            // #15
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

            // #16
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

            // #17
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
        });

        it('Проверка правильной работы пагинации.', async () => {
            const responsePage1 = await request(app.getHttpServer())
                .get('/api/order/get-list-order-page?page=0&limit=10')
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const dataPage1 = responsePage1.body.rows;
            const nCount = responsePage1.body.count;

            expect(nCount).toBe(25);
            expect(dataPage1).toHaveLength(10);

            const responsePage2 = await request(app.getHttpServer())
                .get('/api/order/get-list-order-page?page=1&limit=10')
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const dataPage2 = responsePage2.body.rows;

            expect(dataPage2).toHaveLength(10);

            const responsePage3 = await request(app.getHttpServer())
                .get('/api/order/get-list-order-page?page=2&limit=10')
                .set('Authorization', sJwtTokenBearer)
                .expect(200);

            const dataPage3 = responsePage3.body.rows;

            expect(dataPage3).toHaveLength(5);
        });
    });

    describe('Проверки методов для таблицы order_price', () => {
        let sJwtTokenBearer = '';
        const sUserEmail = 'pashenko2@yandex.ru';
        let idOrderForPrice = 0;

        it('Регистрация пользователя', () =>
            request(app.getHttpServer())
                .post('/api/auth/registration')
                .send({
                    email: 'pashenko2@yandex.ru',
                    password: 'volk',
                    name: 'Пащенко Э.В.',
                    phone: '+7 (987) 787-11-02',
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

        it('Создать заказов на пользователя #1', async () => {
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
                    role: 'admin',
                    desc: 'Тест',
                    descCourier: 'Тест 2',
                })
                .set('Authorization', sJwtTokenBearer)
                .expect(201);
                });

                it('Получить все заказы пользователя', async () => {
                    const response = await request(app.getHttpServer())
                        .get('/api/order/get-list-order-page?page=0&limit=20')
                        .set('Authorization', sJwtTokenBearer)
                        .expect(200);
        
                    const data = response.body.rows;
        
                    // получаем ID последней записи в списке заказов
                    idOrderForPrice = data[0].id;
                    expect(data).toHaveLength(1);
                });

                it('Создаём запись ордер-прайс', async () => {
                    await request(app.getHttpServer())
                        .post('/api/order-price/')
                        .send({
                            priceId: 4, //захардкожено значение, при интеграции тестов заменить на переменную
                            orderId: idOrderForPrice,
                            amount: 2  
                        })
                        .set('Authorization', sJwtTokenBearer)
                        .expect(201);
                    });

                    it(`Обновляем запись ордер-прайс ${idOrderForPrice}`, async () => {
                        const response = await request(app.getHttpServer())
                            .patch(`/api/order-price/4/${idOrderForPrice}`)
                            .send({
                                amount: 7  
                            })
                            .set('Authorization', sJwtTokenBearer)
                            .expect(200);
                        }); 

                    it(`Удалить последний заказ под номером ${idOrderForPrice}`, async () => {
                        const response = await request(app.getHttpServer())
                            .delete(`/api/order-price/4/${idOrderForPrice}`) //захардкожено значение 4, при интеграции тестов заменить на переменную
                            .set('Authorization', sJwtTokenBearer)
                            .expect(200);
                            const sIsDelete = response.text;
                            expect(DeletedAt).toBeNull
                            expect(sIsDelete).toBe('');
                        });       
            });
});
