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
        let sJwtTokenBearer = '';
        const sUserEmail = 'pashenko@yandex.ru';

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

        it('Авторизация под пользователем и получение jwt token', async () => {
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

        it('Сам пользователь удаляет сябя из системы если он есть', async () => {
            await request(app.getHttpServer())
                .delete(`/api/users/${sUserEmail}`)
                .set('Authorization', sJwtTokenBearer)
                .expect(200);
        });
    });
});
