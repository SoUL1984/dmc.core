import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth test E2E Test', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        app.setGlobalPrefix('api');
        await app.init();
    });

    describe('Регистрация нового пользователя. POST /auth/registration', () => {
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

        it('Авторизация пользователя', () =>
            request(app.getHttpServer())
                .post('/api/auth/login')
                .send({
                    email: 'pashenko@yandex.ru',
                    password: 'volk',
                })
                .expect(201));
    });
});
