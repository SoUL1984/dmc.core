import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('Auth test E2E Test', () => {
    let app: INestApplication;

    beforeEach(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('Регистрация нового пользователя. POST /auth/registration', () => {
        const URL = '/auth/registration';
        it('Регистрируем пользователя', () =>
            request(app.getHttpServer())
                .post(URL)
                .send({
                    email: 'Baranov@yandex1.ru',
                    password: 'volk',
                    name: 'Пащенко Э.В.',
                    phone: '+7 (987) 787-80-70',
                })
                .expect(201));
    });
});
