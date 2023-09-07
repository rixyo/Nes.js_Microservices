import { User } from './user.entity';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToMany(() => User, (user) => user.orders)
  @JoinTable({ name: 'user_orders' })
  users: User[];
}
