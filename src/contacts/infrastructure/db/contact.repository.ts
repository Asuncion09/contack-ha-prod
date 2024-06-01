import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from './dao/contact.dao';
import { Repository } from 'typeorm';
import { CreateContactDto } from 'src/contacts/domain/dto/create-contact.dto';
import { UserActiveInterface } from 'src/common/interfaces/user-active.interface';
import { Role } from 'src/common/enums/rol.enum';
import { UpdateContactDto } from 'src/contacts/domain/dto/update-contact.dto';

@Injectable()
export class ContactRepository {
  constructor(
    @InjectRepository(Contact)
    private readonly contactRepository: Repository<Contact>,
  ) {}

  async create(createContactDto: CreateContactDto, user: UserActiveInterface) {
    return await this.contactRepository.save({
      ...createContactDto,
      userEmail: user.email,
    });
  }

  async findAll(user: UserActiveInterface) {
    if (user.role === Role.ADMIN) await this.contactRepository.find();

    return await this.contactRepository.find({
      where: { userEmail: user.email },
    });
  }

  async findOne(id: string, user: UserActiveInterface) {
    const contact = await this.contactRepository.findOneBy({ id });

    if (!contact) {
      throw new BadRequestException('Contact not found');
    }

    this.validateOwnership(contact, user);

    return contact;
  }

  async update(
    id: string,
    updateContactDto: UpdateContactDto,
    user: UserActiveInterface,
  ) {
    await this.findOne(id, user);
    return await this.contactRepository.update(id, {
      ...updateContactDto,
      userEmail: user.email,
    });
  }

  async remove(id: string, user: UserActiveInterface) {
    await this.findOne(id, user);
    return await this.contactRepository.softDelete({ id });
  }

  private validateOwnership(contact: Contact, user: UserActiveInterface) {
    if (user.role !== Role.ADMIN && contact.userEmail !== user.email) {
      throw new UnauthorizedException();
    }
  }
}
