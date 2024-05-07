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
import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'Order detail ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 9.99,  
    description: 'Order detail price',
  })
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: false, transformer: new ColumnNumericTransformer() })
  price: number;

  @ApiProperty({
    description: 'Order',
   })
  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;

  @ApiProperty({
    description: 'Products',
  })
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
