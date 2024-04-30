import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}
@Entity({
  name: 'order_details',
})
export class OrderDetail {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new ColumnNumericTransformer() })
  price: number;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ManyToMany(() => Product, (product) => product.orderDetails)
  @JoinTable({
    name: 'order_details_products',
    joinColumn: {
      name: 'order_detail_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'product_id',
      referencedColumnName: 'id',
    },
  })
  products: Product[];
}
