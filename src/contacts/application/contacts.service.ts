import { Inject, Injectable } from '@nestjs/common';
import { CreateContactDto } from '../domain/dto/create-contact.dto';
import { UpdateContactDto } from '../domain/dto/update-contact.dto';
import { ContactRepository } from '../infrastructure/db/contact.repository';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';

@Injectable()
export class ContactsService {
  constructor(
    @Inject(ContactRepository) private contactRepository: ContactRepository,
  ) {}

  async create(createContactDto: CreateContactDto, user: UserActiveInterface) {
    return await this.contactRepository.create(createContactDto, user);
  }

  async findAll(user: UserActiveInterface) {
    return await this.contactRepository.findAll(user);
  }

  async findOne(id: number, user: UserActiveInterface) {
    return await this.contactRepository.findOne(id, user);
  }

  async update(
    id: number,
    updateContactDto: UpdateContactDto,
    user: UserActiveInterface,
  ) {
    return await this.contactRepository.update(id, updateContactDto, user);
  }

  async remove(id: number, user: UserActiveInterface) {
    return await this.contactRepository.remove(id, user);
  }
}
