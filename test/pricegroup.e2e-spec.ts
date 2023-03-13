import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../src/app.module';
import * as request from 'supertest';

/**
 * Для теста необходим логин и пароль Админа
 */
const sEmail = 'admin@mail.ru';
const sPassword = 'qwerty1234';
describe('Price-group E2E Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });

    describe('Проверка модуля price-group', () => {
        let sJwtTokenBearer = '';

        let idPriceGroup = 0;

        it('Авторизация под админом', async () => {
            const response = await request(app.getHttpServer())
                .post('/auth/login')
                .send({
                    email: sEmail,
                    password: sPassword,
                })
                .expect(201);
            const jwtToken = response.body.token;
            expect(jwtToken).toMatch(/^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/);
            sJwtTokenBearer = `Bearer ${jwtToken}`;
        });

        it('Создать группу для прайс-листа', async () => {
            await request(app.getHttpServer())
                .post('/price-group/create')
                .send({
                    pricegroup_name: 'Цирконий',
                    pricegroup_desc: 'Описание циркония',
                })
                .expect(201);
        });

        it('Получить все группы', async () => {
            const response = await request(app.getHttpServer()).get('/price-group');
            const data = response.body.rows;
            idPriceGroup = data[0].id;
            expect(data).toHaveLength(1);
        });

        it('Получить все группы и позиции для прайc-листа', async () => {
            const response = await request(app.getHttpServer()).get('/price-group//all-pricegroup-and-price');
            const data = response.body.rows;
            expect(data).toHaveLength(0);
        });

        it('Изменение данных группы для прайслиста', async () => {
            await request(app.getHttpServer())
                .patch(`/price-group/${idPriceGroup}`)
                .send({
                    pricegroup_name: 'Цирконий 2.0',
                    pricegroup_desc: 'Обновленная версия',
                })
                .expect(200);
        });

        it('Удаление группы для прайслиста с всеми позициями из прайслиста', async () => {
            await request(app.getHttpServer()).delete(`/price-group/${idPriceGroup}`).expect(200);
        });
    });
});
