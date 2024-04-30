import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import { OrderDetail } from 'src/order-details/entities/order-detail.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private ordersRepository: Repository<Order>,
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    @InjectRepository(User) private usersRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) {}
  async create(createOrderDto: CreateOrderDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
      let total = 0;
      const user = await this.usersRepository.findOne({
        where: { id: createOrderDto.userId },
      });

      if (!user) {
        throw new NotFoundException(
          `User id ${createOrderDto.userId} not found`,
        );
      }

      const order = new Order();
      order.user = user;
      order.date = new Date();
      //   const newOrder = await this.ordersRepository.save(order);
      const newOrder = await queryRunner.manager.save(order);

      const productsArray = await Promise.all(
        createOrderDto.products.map(async (product) => {
          const productEntity = await this.productsRepository.findOne({
            where: { id: product.id },
          });
          if (!productEntity) {
            throw new NotFoundException(`Product id ${product.id} not found`);
          }
          if (productEntity.stock === 0) {
            throw new NotFoundException(
              `Product id ${product.id} out of stock`,
            );
          }
          total += productEntity.price;
          productEntity.stock -= 1;
          //   await this.productsRepository.save(productEntity);
          await queryRunner.manager.save(productEntity);
          return productEntity;
        }),
      );

      const orderDetail = new OrderDetail();
      orderDetail.order = newOrder;
      orderDetail.products = productsArray;
      orderDetail.price = total;
      //   await this.orderDetailRepository.save(orderDetail);
      await queryRunner.manager.save(orderDetail);
      await queryRunner.commitTransaction();

      return await this.ordersRepository.findOne({
        where: { id: newOrder.id },
        relations: { orderDetail: true },
      });
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (error.status === 404) {
        throw new NotFoundException(error.message);
      } else throw new InternalServerErrorException(error.message);
    } finally {
      await queryRunner.release();
    }
  }
  async findOne(id: string) {
    const order = await this.ordersRepository.findOne({
      where: { id },
      relations: { orderDetail: { products: true } },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    return order;
  }
  async findAll() {
    return await this.ordersRepository.find({
      relations: { orderDetail: { products: true } },
    });
  }
}