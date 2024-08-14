import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import {ConfigModule} from "@nestjs/config";
import { UserModule } from './user/user.module';
import { OtpModule } from './otp/otp.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    TypeOrmModule.forRoot({
      // name: 'pgStandByConnection',
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "almari123", //new credentials
      database: "postgres",
      synchronize: false,
      autoLoadEntities: true,
    }),
    
    UserModule,
    
    OtpModule,
    
    OrdersModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
