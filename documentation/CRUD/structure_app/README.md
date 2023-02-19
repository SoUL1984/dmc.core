## Добавление или редактирование новой сущности (модели)

- [X] Настройка nestjs в проекте
- [X] Создание сущности (модели)


#### Настройка nestjs в проекте

Для более удобной настройки nestjs в проекте, необходимо данный пакет установить глобально через команду
npm install -g @nestjs/cli и у вас станут доступны команды:

```
 - nest --help
 - nest generate --help
 
nest g mo user (генерируем модуль)
nest g s user (генерируем сервис)
nest g co user (генерируем контроллер)
```
Также для работы с VS Code есть удобный плагин для работы с nestjs NestJS Files.

#### Создание сущности (модели)

Для созданиея новой сущности (модели в проекте dmc.core) нужно:

1) Описасть модель (сущность) для этого создаем файл 'user'.entity
2) Делаем описание данной сущности на примере (даное описание сущности относится к работе с ORM sequelize)

@ApiProperty - пример для swagger

```typescript

import { ApiProperty } from '@nestjs/swagger';
import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Order } from '../../module/order/order.entity';

export enum EnumRole {
  customer = 'customer',
  dentaltechn = 'dentaltechn',
  director = 'director',
  courier = 'courier',
  admin = 'admin',
}

interface UserCreationAttrs {
  email: string;
  password: string;
  name: string;
  phone: string;
}

@Table({ tableName: 'users', paranoid: true })
export class User extends Model<User, UserCreationAttrs> {
  @ApiProperty({ example: '1', description: 'Уникальный индентификатор' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'user@mail.ru', description: 'Электронная почта' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @ApiProperty({ example: '12345678', description: 'Пароль' })
  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ApiProperty({ example: 'Пащенко Эдуард', description: 'Имя пользователя' })
  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ApiProperty({
    example: 'Самара',
    description: 'Город',
  })
  @Column({
    type: DataType.ENUM,
    values: ['Москва', 'Санкт-Петербург', 'Самара'],
  })
  city: string;

  @ApiProperty({
    example: 'ул. Дыбенко, д. 27В',
    description: 'Адрес пользователя',
  })
  @Column({ type: DataType.STRING })
  address: string;

  @ApiProperty({
    example: 'Необходимо звонить вечером',
    description: 'Дполнительная информация',
  })
  @Column({ type: DataType.STRING })
  desc: string;

  @ApiProperty({ example: '+7 (123) 456-78-90', description: 'Телефон' })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  phone: string;

  @ApiProperty({
    example: '05.12.1984',
    description: 'День рождение',
  })
  @Column({ type: DataType.DATE })
  birthday: Date;

  @ApiProperty({ example: 'customer', description: 'Роль' })
  @Column({
    type: DataType.ENUM,
    values: Object.values(EnumRole),
    defaultValue: EnumRole.customer,
    allowNull: false,
  })
  role: string;

  @ApiProperty({ example: 'true', description: 'Признак удаленной записи' })
  @Column({ type: DataType.BOOLEAN, allowNull: false, defaultValue: false })
  isDelete: boolean;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата последнего посещения',
  })
  @Column({ type: DataType.DATE })
  lastVisit: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата создания',
  })
  @Column({ type: DataType.DATE })
  createdAt: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата обновления',
  })
  @Column({ type: DataType.DATE })
  updatedAt: Date;

  @ApiProperty({
    example: '01.01.2021',
    description: 'Дата удаления',
  })
  @Column({ type: DataType.DATE })
  deletedAt: Date;

  @HasMany(() => Order)
  orders: Order[];
}
```

3) Далее делаем 'users'.controller.ts
   
```typescript
@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  //TODO:Данный блок вероятно не нужен его покрывает регистрация пользователя.
  // @ApiOperation({ summary: 'Создать пользователя' })
  // @ApiResponse({ status: 200, type: [User] })
  // @UsePipes(ValidationPipe)
  // @Roles(EnumRole.admin)
  // @Post('/create')
  // create(@Body() userDto: CreateUserDto) {
  //   return this.userService.createUser(userDto);
  // }

  @ApiOperation({ summary: 'Получить всех пользователей' })     // дополнительное описание для swagger данного роута
  @ApiResponse({ status: 200, type: [SelectAllUserDto] })       // Response для swagger
  @Roles(EnumRole.admin)                                        // Роль которым разрешено пользоваться данным роутом
  @UseGuards(RoleGuard)                                         // Пользователь должен быть авторизован
  @Get()                                                        // тип запроса
  getALL() {                                                    // наименование запроса со всеми параметрами
    const userDto = this.userService.getAllUsers();
    return userDto;
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {                       //@Param - параметры, которые передаюся при модификации данных
    return this.userService.deleteUserByEmail(email);
  }

  @ApiOperation({
    summary: 'Обновить данные пользователя по электронной почте',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Patch(':email')
  // @Param - параметр по которуму происходит поиск для модицфикации данны, Body - тело (ряд пораметров), которые будут изменены в данной записи
  update(@Param('email') email: string, @Body() userDto: UpdateUserDto) {    
    return this.userService.updateUserByEmail(userDto, email);
  }

  @ApiOperation({
    summary:
      'Обновить данные, текущего, пользователя (обновление данных самого себя)',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(
    EnumRole.admin,
    EnumRole.courier,
    EnumRole.customer,
    EnumRole.dentaltechn,
    EnumRole.director,
  )
  @UseGuards(RoleGuard)
  @Patch()
  updateCurrentlyUser(@CurUser() user, @Body() myDto: UpdateMyDto) {
    // преобразование типов сделано, чтобы нельзя было обновить роль самому себе
    const userDto: UpdateUserDto = myDto as UpdateUserDto;
    const email = user.email;
    return this.userService.updateUserByEmail(userDto, email);
  }
}
```

@Controller('users') // делаем описание того, что это контроллер




```
ROLES (all)

POST: http://localhost:5000/auth/registration
{
    "email": "volk@mail.ru",
    "password": "volk",
    "name": "Татьянапп",
    "city": "Самара",
    "address": "Силовая ул., дом 4, кв. 144",
    "desc": "Дополнительное описание",
    "phone": "+7 (901) 333-54-02",
    "birthday": "05.12.1984"
}
```
Поля указанные ниже не могут быть созданы при регистрации. Они изменяются уже администратором, входе жизни данного пользователя.
```
"role": "customer",
"isDelete":false
```
Выходными данными являются token пользователя. Пользователь, который обращается к endpoints без token, считается не зарегистрированным в системе соответственно, не имеет доступа.

Пример выходных данных endpoint регистрация:

```
[
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InAyQG1haWwucnUiLCJpZCI6Nywicm9sZSI6ImN1c3RvbWVyIiwiaWF0IjoxNjM2MzE3MzQ5LCJleHAiOjE2MzY0MDM3NDl9.-mCBZ_MphTUjN0J1gXUMPxNQOl5P2QJMz92GspS53QA"
]
```

#### Получить всех пользователей

```
ROLES (admin)

GET: http://localhost:5000/users
```
Данных для отправки в этом запросе нет. Мы сможем получить от системы положительный ответ, только если пользователь авторизован и имеет token, а также пользователь имеет права admin. Также в ходе обсуждения было решено убрать поле password, так как в этой информации нет необходимости.

Пример выходных данных endpoint "Получить всех пользователей":

```
[
    {
        "email": "q14554@mail.ru",
        "name": "Татьянапп",
        "city": null,
        "address": "Силовая ул., дом 4, кв. 144",
        "desc": "Дополнительное описание",
        "phone": "+7 (901) 3332-54-02",
        "birthday": "1984-05-11T19:00:00.000Z",
        "role": "customer",
        "isDelete": false,
        "lastVisit": null,
        "createdAt": "2021-11-07T20:21:37.000Z",
        "updatedAt": "2021-11-07T20:21:37.000Z",
        "deletedAt": null
    },
    {
        "email": "q145354@mail.ru",
        "name": "Татьянапп",
        "city": null,
        "address": null,
        "desc": "Дополнительное описание",
        "phone": "+7 (901) 3332-5-02",
        "birthday": "1984-05-11T19:00:00.000Z",
        "role": "customer",
        "isDelete": false,
        "lastVisit": null,
        "createdAt": "2021-11-07T20:22:25.000Z",
        "updatedAt": "2021-11-07T20:22:25.000Z",
        "deletedAt": null
    }
]
```

#### Удаление пользователя (by email)

```
ROLES (admin)

DELETE: http://localhost:5000/users/v@mail.ru
```

В качестве входящих данных через url передается адрес электронной почты пользователя которого необходимо удалить.

Если пользователь удален успешно, то в базе данных в таблице пользователей мы ставим isDelete = true, а также отмечаем дату удаления пользователя deletedAt.

В качестве выходных данных система выдает 1 или 0 (если строка была удалена то 1, если по какой-то причине удалить не удалось то 0).

Удалить может только авторизованный пользователь с правами администратора.

Пример выходных данных endpoint "Удаление пользователя":

```
[
    1
]
```

#### Изменение данных пользователя (by email)

```
ROLES (admin)

PATCH: http://localhost:5000/users/q145354@mail.ru

```

В качестве входящих данных через url передается адрес электронной почты пользователя данные которого необходимо отредактировать.

Удаленный ранее пользователь не может быть отредактирован.

Если данные пользователя изменены успешно, то в базе данных в таблице пользователей меняются те данные, которые мы передали для изменения update-user.dto.ts (UpdateUserDto), а также меняется запись updateAt.

```
{
    "address": "Sylovaya 4-144"
}
```

В качестве выходных данных система выдает 1 или 0 (если запись была изменена то 1, если по какой-то причине изменить не удалось то 0).

Изменить запись может только авторизованный пользователь с правами администратора.

Пример выходных данных endpoint "Изменение данных пользователя (by email)":
```
[
    1
]
```

#### Редактирование собственного профиля

```
ROLES (all)

PATCH: http://localhost:5000/users
```
Каждый авторизованный пользователь может измениь свои данные, если он не является удаленным.

Роль пользователь себе изменить не может.

Пример выходных данных endpoint "Редактирование собственного профиля":
```
[
    1
]
```

