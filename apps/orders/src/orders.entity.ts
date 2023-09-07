import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity()
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  userId: string;
  @Column({ default: new Date() })
  createdAt: Date;
}
