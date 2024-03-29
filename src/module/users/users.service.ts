import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Op } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { SelectAllUserDto } from './dto/select-all-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userRepository: typeof User) {}
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        //const role = 'admin'; //await this.userRepository.getUserByEmail(user.email)
        //await user.$set('role', role);
        //user.role = role;
        return user;
    }

    async getAllUsers() {
        const users: SelectAllUserDto[] = await this.userRepository.findAll({
            attributes: [
                'email',
                'name',
                'city',
                'address',
                'desc',
                'phone',
                'birthday',
                'role',
                'isDelete',
                'lastVisit',
                'createdAt',
                'updatedAt',
                'deletedAt',
            ],
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        return user;
    }

    async getUserByEmailOrPhone(email: string, phone: string) {
        const user = await this.userRepository.findOne({
            where: {
                [Op.or]: [{ email }, { phone }],
            },
        });
        return user;
    }

    async updateUserByEmail(dto: UpdateUserDto, email: string) {
        return await this.userRepository.update(dto, {
            where: { email, isDelete: false },
        })[0];
    }

    /**
     * Пометить пользователя на удаление
     */
    async markForDeleteUserByEmail(email: string) {
        return await this.userRepository.update({ isDelete: true, deletedAt: new Date() }, { where: { email } });
    }

    /**
     * Полное удаление пользователя
     */
    async deleteUserByEmail(email: string) {
        return await this.userRepository.destroy({ where: { email }, force: true });
    }
}
