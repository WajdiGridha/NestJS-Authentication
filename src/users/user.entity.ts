import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';

export enum UserRole {
  SUPERADMIN = 'superadmin',
  ADMIN = 'admin',
  SHOP = 'shop',
  PLAYER = 'player',
}

@Entity()
//export class User extends BaseEntity {
export class User {
  /*@PrimaryGeneratedColumn()
  id: number;*/

  @PrimaryGeneratedColumn('increment', {
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.PLAYER,
  })
  role: UserRole;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 8);
  }

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }
}
