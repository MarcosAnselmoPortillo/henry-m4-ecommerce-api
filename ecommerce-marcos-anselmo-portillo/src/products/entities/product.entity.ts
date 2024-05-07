import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  ManyToMany,
} from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

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
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'Product ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'Product Name',
    description: 'Product name',
  })
  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @ApiProperty({
    example: 'Product description',
    description: 'Product description',
  })
  @Column({ type: 'text', nullable: false })
  description: string;

  @ApiProperty({
    example: 9.99,
    description: 'Product price',
  })
  @Column({
    type: 'numeric',
    precision: 10,
    scale: 2,
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  price: number;

  @ApiProperty({
    example: 10,
    description: 'Product stock',
  })
  @Column({ type: 'int', nullable: false })
  stock: number;

  @ApiProperty({
    example: 'https://example.com/default-image.jpg',
    description: 'Product image url',
    default: 'https://example.com/default-image.jpg',
  })
  @Column({ length: 255, default: 'https://example.com/default-image.jpg' })
  imgUrl: string;

  @ApiProperty({
    description: 'Product category',
    type: () => Category,
  })
  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ApiProperty({
    description: 'Product order details',
  })
  @ManyToMany(() => OrderDetail, (orderDetail) => orderDetail.products)
  orderDetails: OrderDetail[];
}
