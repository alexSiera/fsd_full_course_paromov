import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PasswordService } from './auth/password.service';
import { CookieService } from './auth/cookie.service';

@Module({
  imports: [DbModule, AuthModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PasswordService, CookieService],
})
export class AppModule {}
