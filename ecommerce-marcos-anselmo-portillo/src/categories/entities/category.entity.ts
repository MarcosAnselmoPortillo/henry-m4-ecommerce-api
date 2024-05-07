import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Entity({
    name: 'categories',
})
export class Category {
  /**
   * Category ID
   * @example 00000000-0000-0000-0000-000000000000
   * */
  @PrimaryGeneratedColumn('uuid')
  id: string;

  /**
   * Category name
   * @example Electronics
   * */
  @Column({ length: 50, nullable: false, unique: true })
  name: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
