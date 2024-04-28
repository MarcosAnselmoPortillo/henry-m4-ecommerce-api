import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 20, nullable: false })
  password: string;

  @Column({ type: 'int' })
  phone: number;

  @Column({ length: 50 })
  country: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ length: 50 })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
