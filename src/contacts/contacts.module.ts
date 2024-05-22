import { Module } from '@nestjs/common';
import { ContactsService } from './application/contacts.service';
import { ContactsController } from './infrastructure/controller/contacts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './infrastructure/db/dao/contact.dao';
import { AuthModule } from 'src/auth/auth.module';
import { ContactRepository } from './infrastructure/db/contact.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Contact]), AuthModule],
  controllers: [ContactsController],
  providers: [ContactsService, ContactRepository],
})
export class ContactsModule {}
