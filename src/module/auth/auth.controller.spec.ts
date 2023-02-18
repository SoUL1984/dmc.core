// import { Test, TestingModule } from '@nestjs/testing';
// import { CreateUserDto } from '../users/dto/create-user.dto';
// import { AuthController } from './auth.controller';

// describe('AuthController', () => {
//     let controller: AuthController;

//     const vUserDto = {
//         email: 'Baranov@yandex3.ru',
//         password: 'volk',
//         name: 'Пащенко Э.В.',
//         phone: '+7 (987) 787-80-81',
//     } as unknown as CreateUserDto;

//     const vResponseToken = {
//         status: jest.fn((x) => x),
//         send: jest.fn((x) => x),
//     } as unknown as Response;

//     beforeEach(async () => {
//         const moduleFixture: TestingModule = await Test.createTestingModule({
//             imports: [AuthController],
//         }).compile();

//         controller = moduleFixture.get<AuthController>(AuthController);
//     });

//     describe('getAll', () => {
//         it('Должен получить всех пользователей', async () => {
//             await controller.registration(vUserDto);
//             expect(vResponseToken.status).toHaveBeenCalledWith(201);
//         });
//     });
// });
