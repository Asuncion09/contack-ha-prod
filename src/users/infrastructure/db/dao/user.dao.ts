import { Role } from '../../../../common/enums/rol.enum';

import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: false, select: false })
  password: string;

  @Column({ nullable: true })
  imagenUrl: string;

  @Column({ type: 'enum', default: Role.USER, enum: Role })
  role: Role;

  @DeleteDateColumn()
  deletedAt: Date;
}
