import { Column, PrimaryGeneratedColumn, Entity } from 'typeorm';
@Entity()
export class Billing {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  userId: string;
  @Column()
  orderId: string;
  @Column({ default: new Date() })
  createdAt: Date;
}
