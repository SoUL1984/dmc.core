import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from '../../decorator/role-auth.decorator';
import { CurUser } from '../../decorator/user-auth.decorator';
import { RoleGuard } from '../../module/auth/role.guard';
import { SelectAllUserDto } from './dto/select-all-user.dto';
import { UpdateMyDto } from './dto/update-my.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnumRole, User } from './users.entity';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
@UseGuards(RoleGuard)
export class UsersController {
    constructor(private readonly userService: UsersService) {}

    @Roles('Получить всех пользователей', [SelectAllUserDto], [EnumRole.admin])
    @Get()
    getAll() {
        const userDto = this.userService.getAllUsers();
        return userDto;
    }

    @Roles('Удалить пользователя', [User], [EnumRole.admin])
    @Patch(':email')
    remove(@Param('email') email: string) {
        return this.userService.markForDeleteUserByEmail(email);
    }

    @Roles('Удалить пользователя полностью', [User], [EnumRole.customer])
    @Delete(':email')
    delete(@Param('email') email: string) {
        return this.userService.deleteUserByEmail(email);
    }

    @Roles('Обновить данные пользователя по электронной почте', [User], [EnumRole.admin])
    @Patch(':email')
    update(@Param('email') email: string, @Body() userDto: UpdateUserDto) {
        return this.userService.updateUserByEmail(userDto, email);
    }

    @Roles(
        'Обновить данные, текущего, пользователя (обновление данных самого себя)',
        [User],
        [EnumRole.admin, EnumRole.courier, EnumRole.customer, EnumRole.dentaltechn, EnumRole.director]
    )
    @Patch()
    updateCurrentlyUser(@CurUser() user, @Body() myDto: UpdateMyDto) {
        // преобразование типов сделано, чтобы нельзя было обновить роль самому себе
        const userDto: UpdateUserDto = myDto as UpdateUserDto;
        const email = user.email;
        return this.userService.updateUserByEmail(userDto, email);
    }
}
