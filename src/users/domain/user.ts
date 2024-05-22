import { Role } from 'src/common/enums/rol.enum';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  imagenUrl: string;
  role: Role;
  deletedAt: Date;
}
