import { Entity, PrimaryGeneratedColumn, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
@Entity({
    name: 'order_details',
}
)
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false })
  price: number;

  @OneToOne(() => Order, order => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, product => product.orderDetails)
  @JoinTable()
  products: Product[];
}