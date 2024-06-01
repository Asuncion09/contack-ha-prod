import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ContactsService } from '../../application/contacts.service';
import { CreateContactDto } from '../../domain/dto/create-contact.dto';
import { UpdateContactDto } from '../../domain/dto/update-contact.dto';
import { Auth } from '../../../auth/infrastructure/decorators/auth.decorator';
import { Role } from '../../../common/enums/rol.enum';
import { ActiveUser } from '../../../common/decorators/active-user.decorator';
import { UserActiveInterface } from '../../../common/interfaces/user-active.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('contacts')
@ApiBearerAuth()
@Auth(Role.USER)
@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(
    @Body() createContactDto: CreateContactDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.contactsService.create(createContactDto, user);
  }

  @Get()
  findAll(@ActiveUser() user: UserActiveInterface) {
    return this.contactsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
    return this.contactsService.findOne(id, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContactDto: UpdateContactDto,
    @ActiveUser() user: UserActiveInterface,
  ) {
    return this.contactsService.update(id, updateContactDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: UserActiveInterface) {
    return this.contactsService.remove(id, user);
  }
}
