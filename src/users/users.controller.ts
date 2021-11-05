import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { CurUser } from 'src/auth/user-auth.decorator';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EnumRole, User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Get()
  getALL() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Удалить пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }

  @ApiOperation({ summary: 'Обновить данные пользователя' })
  @ApiResponse({ status: 200, type: [User] })
  @Roles(EnumRole.admin)
  @UseGuards(RoleGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUserByEmail(userDto, email);
  }

  @ApiOperation({ summary: 'Обновить данные пользователя' })
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
  updateCurrentlyUser(@CurUser() user, @Body() userDto: UpdateUserDto) {
    const email = user.email;
    return this.userService.updateUserByEmail(userDto, email);
  }
}
