import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { ApiProperty, OmitType } from '@nestjs/swagger';

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
  @ApiProperty({
    example: '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f',
    description: 'User ID',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    example: 'John Doe',
    description: 'User name',
  })
  @Column({ length: 80, nullable: false })
  name: string;

  @ApiProperty({
    example: 'mail@example.com',
    description: 'User email',
  })
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @ApiProperty({
    description: 'User password hashed',
    example: '$2y$10$hudIsIbWRCIK3fwPCJqz4.LI260PCjiW91BCs/pWJgu7YcK4j7yI.',
  })
  @Column({ length: 80, nullable: false })
  password: string;

  @ApiProperty({
    example: 1234567890,
    description: 'User phone number',
  })
  @Column({
    type: 'bigint',
    nullable: false,
    transformer: new ColumnNumericTransformer(),
  })
  phone: number;

  @ApiProperty({
    example: 'United States',
    description: 'User country',
  })
  @Column({ length: 50, nullable: true })
  country?: string;

  @ApiProperty({
    example: '123 Main St.',
    description: 'User address',
  })
  @Column({ length: 80, nullable: true })
  address?: string;

  @ApiProperty({
    example: 'New York',
    description: 'User city',
  })
  @Column({ length: 50, nullable: true })
  city?: string;

  @ApiProperty({
    example: true,
    description: 'User admin',
    default: false,
  })
  @Column({ default: false })
  isAdmin: boolean;

  @ApiProperty({
    description: 'User orders',
    type: [Order],
  })
  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}

export class UserResponse extends OmitType(User, ['password']) {}
