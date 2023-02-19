import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule, SequelizeModuleOptions } from '@nestjs/sequelize';
import { Order } from './module/order/order.entity';
import { User } from './module/users/users.entity';
import { UsersModule } from './module/users/users.module';
import { AuthModule } from './module/auth/auth.module';
import { PricegroupModule } from './module/pricegroup/pricegroup.module';
import { Price } from './module/price/price.entity';
import { PriceGroup } from './module/pricegroup/pricegroup.entity';
import { OrderPrice } from './module/OrderPrice/OrderPrice.entity';
import { PriceModule } from './module/price/price.module';
import { OrderModule } from './module/order/order.module';
import { OrderPriceModule } from './module/OrderPrice/OrderPrice.module';

/**
 * Определяем, какие настройки будем применять development или test
 */
const devSequelizeOptions: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB,
    password: process.env.MYSQL_PASSWORD,
    models: [User, PriceGroup, Price, Order, OrderPrice],
    autoLoadModels: true,
};

const testSequelizeOptions: SequelizeModuleOptions = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    port: Number(process.env.MYSQL_PORT),
    username: process.env.MYSQL_USER,
    database: process.env.MYSQL_DB_TEST,
    password: process.env.MYSQL_PASSWORD,
    models: [User, PriceGroup, Price, Order, OrderPrice],
    autoLoadModels: true,
};

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`,
        }),
        SequelizeModule.forRoot(process.env.NODE_ENV === 'test' ? testSequelizeOptions : devSequelizeOptions),
        UsersModule,
        AuthModule,
        PricegroupModule,
        PriceModule,
        OrderModule,
        OrderPriceModule,
    ],
})
export class AppModule {}
