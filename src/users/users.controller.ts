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
//import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role-auth.decorator';
import { RoleGuard } from 'src/auth/role.guard';
import { ValidationPipe } from 'src/pipes/validation.pipe';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.model';
import { UsersService } from './users.service';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Создать пользователя' })
  @ApiResponse({ status: 200, type: User })
  //@UsePipes(ValidationPipe)
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.userService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Role('admin')
  @UseGuards(RoleGuard)
  @Get()
  getALL() {
    return this.userService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Role('admin')
  @UseGuards(RoleGuard)
  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.userService.deleteUserByEmail(email);
  }

  @ApiOperation({ summary: 'Получить всех пользователей' })
  @ApiResponse({ status: 200, type: [User] })
  @Role('admin')
  @UseGuards(RoleGuard)
  @Patch(':email')
  update(@Param('email') email: string, @Body() userDto: UpdateUserDto) {
    return this.userService.updateUserByEmail(userDto, email);
  }
}
