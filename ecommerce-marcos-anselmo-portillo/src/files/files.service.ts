import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductsDbService } from 'src/products/productsDb.service';
import { CloudinaryService } from './files.repository';
import { Product } from 'src/products/entities/product.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(Product) private productsRepository: Repository<Product>,
    private readonly filesRepository: CloudinaryService,
  ) {}
  async uploadImage(productId: string, file: Express.Multer.File) {
    const product = await this.productsRepository.findOne({
      where: { id: productId },
    });
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }
    const cloudinaryResponse = await this.filesRepository.uploadImage(file);

    if (!cloudinaryResponse) {
      throw new NotFoundException('Error uploading image');
    }

    await this.productsRepository.update(productId, {
      imgUrl: cloudinaryResponse.secure_url,
    });
    const updatedProduct = await this.productsRepository.findOne({
      where: { id: productId },
    });
    return updatedProduct;
  }
}
