import { Order } from './orders.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  Unique,
  JoinTable,
} from 'typeorm';
enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  @Unique(['email'])
  email: string;
  @Column()
  password: string;
  @Column({
    default: Role.USER,
  })
  role: Role;
  @ManyToMany(() => User, (user) => user.orders, { cascade: true })
  @JoinTable({ name: 'user_orders' })
  orders: Order[];
  @Column({
    default: new Date(),
  })
  createdAt: Date;
  @Column({
    default: new Date(),
  })
  updatedAt: Date;
}
