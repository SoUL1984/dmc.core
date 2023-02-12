import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUserDto, CreateUserDto } from '../module/users/dto/create-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() userDto: AuthUserDto) {
    return this.authService.login(userDto);
  }

  @Post('/registration')
  @UsePipes(ValidationPipe)
  registration(@Body() userDto: CreateUserDto) {
    return this.authService.registration(userDto);
  }
}
