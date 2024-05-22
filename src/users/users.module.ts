import { Module } from '@nestjs/common';
import { UsersService } from './application/users.service';
import { UsersController } from './infrastructure/controller/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './infrastructure/db/dao/user.dao';
import { AuthModule } from '../auth/auth.module';
import { UserRepository } from './infrastructure/db/user.repository';

@Module({
  imports: [TypeOrmModule.forFeature([User]), AuthModule],
  controllers: [UsersController],
  providers: [UsersService, UserRepository],
  exports: [TypeOrmModule, UsersService],
})
export class UsersModule {}
