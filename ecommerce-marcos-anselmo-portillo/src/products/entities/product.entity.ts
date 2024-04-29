import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

/// ColumnNumericTransformer
export class ColumnNumericTransformer {
  to(data: number): number {
    return data;
  }
  from(data: string): number {
    return parseFloat(data);
  }
}

@Entity({
  name: 'products',
})
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'numeric', precision: 10, scale: 2, nullable: false, transformer: new ColumnNumericTransformer() })
  price: number;

  @Column({ type: 'int', nullable: false })
  stock: number;

  @Column({ length: 255, default: 'https://example.com/default-image.jpg' })
  imgUrl: string;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
