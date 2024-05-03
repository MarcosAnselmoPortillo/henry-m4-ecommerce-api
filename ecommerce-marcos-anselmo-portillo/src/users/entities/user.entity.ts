import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';

export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 80, nullable: false })
  name: string;

  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @Column({ length: 80, nullable: false })
  password: string;

  @Column({ type: 'bigint', nullable: false , transformer: new ColumnNumericTransformer() })
  phone: number;

  @Column({ length: 50, nullable: true })
  country: string;

  @Column({ length: 80, nullable: true })
  address: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ default: false })
  isAdmin: boolean;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
