import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({
  name: 'orders',
})
export class Order {
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'Order ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: '2022-01-01',
    description: 'Order date',
  })
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty({
    description: 'Order user',
  })
  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ApiProperty({
    description: 'Order details',
  })
  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  @JoinColumn()
  orderDetail: OrderDetail;
}
