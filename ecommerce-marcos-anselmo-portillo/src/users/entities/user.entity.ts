import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from 'src/orders/entities/order.entity';
import { IsEmail, IsString, IsOptional, MinLength, MaxLength, IsInt } from 'class-validator';

@Entity({
  name: 'users',
})
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(50)
  @Column({ length: 50, nullable: false })
  name: string;

  @IsEmail()
  @MaxLength(50)
  @Column({ length: 50, unique: true, nullable: false })
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(20)
  @Column({ length: 20, nullable: false })
  password: string;

  @IsInt()
  @IsOptional()
  @Column({ type: 'bigint', nullable: true })
  phone: number;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Column({ length: 50, nullable: true })
  country: string;

  @IsString()
  @IsOptional()
  @Column({ type: 'text', nullable: true })
  address: string;

  @IsString()
  @IsOptional()
  @MaxLength(50)
  @Column({ length: 50, nullable: true })
  city: string;

  @OneToMany(() => Order, (order) => order.user)
  orders: Order[];
}
