import { Module } from '@nestjs/common';
import { DbModule } from './db/db.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PasswordService } from './auth/password.service';
import { CookieService } from './auth/cookie.service';
import { AccountModule } from './account/account.module';
import { BlockListModule } from './block-list/block-list.module';

@Module({
  imports: [DbModule, AuthModule, UsersModule, AccountModule, BlockListModule],
  controllers: [],
  providers: [PasswordService, CookieService],
})
export class AppModule {}
