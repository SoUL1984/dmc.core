import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/decorator/role-auth.decorator';
import { RoleGuard } from 'src/module/auth/role.guard';
import { CurUser } from 'src/module/auth/user-auth.decorator';
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

  //TODO:Данный блок вероятно не нужен его покрывает регистрация пользователя.
  // @ApiOperation({ summary: 'Создать пользователя' })
  // @ApiResponse({ status: 200, type: [User] })
  // @UsePipes(ValidationPipe)
  // @Roles(EnumRole.admin)
  // @Post('/create')
  // create(@Body() userDto: CreateUserDto) {
  //   return this.userService.createUser(userDto);
  // }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [SelectAllUserDto] })
  @Roles(EnumRole.admin)
  @Get()
  getALL() {
    const userDto = this.userService.getAllUsers();
    return userDto;
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }

  @ApiOperation({
    summary: 'Обновить данные пользователя по электронной почте',
  })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @Patch(':email')
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
  @Patch()
  updateCurrentlyUser(@CurUser() user, @Body() myDto: UpdateMyDto) {
    // преобразование типов сделано, чтобы нельзя было обновить роль самому себе
    const userDto: UpdateUserDto = myDto as UpdateUserDto;
    const email = user.email;
    return this.userService.updateUserByEmail(userDto, email);
  }
}
