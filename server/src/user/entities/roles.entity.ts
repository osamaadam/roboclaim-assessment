import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../../auth/enums/role.enum';

@Entity('roles')
export class RolesEntity {
  constructor(partial: Partial<RolesEntity>) {
    Object.assign(this, partial);
  }

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  role: Role;
}
