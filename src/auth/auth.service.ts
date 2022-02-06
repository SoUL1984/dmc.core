import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthUserDto, CreateUserDto } from 'src/users/dto/create-user.dto';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(userDto: AuthUserDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const candidate = await this.userService.getUserByEmailOrPhone(userDto.email, userDto.phone);
    if (candidate) {
      throw new HttpException(
        'Пользователь с таким email или телефоном существует',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);
    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });
    return this.generateToken(user);
  }
  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.role };
    return {
      token: this.jwtService.sign(payload),
    };
  }
  private async validateUser(userDto: AuthUserDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (user == null) {
      throw new UnauthorizedException({
        message: 'AuthService.validateUser - Пользователь не найден',
      });
    }
    if (user.isDelete) {
      throw new UnauthorizedException({
        message: 'Пользователь не найден',
      });
    }
    const passwordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && passwordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }
}
