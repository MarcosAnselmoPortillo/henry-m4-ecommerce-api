import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './products.interface';

@Injectable()
export class ProductsRepository {
  private products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High-performance laptop',
      price: 1200,
      stock: true,
      imgUrl: 'https://example.com/laptop.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Latest smartphone model',
      price: 800,
      stock: true,
      imgUrl: 'https://example.com/smartphone.jpg',
    },
    {
      id: 3,
      name: 'Headphones',
      description: 'Noise-cancelling headphones',
      price: 150,
      stock: false,
      imgUrl: 'https://example.com/headphones.jpg',
    },
    {
      id: 4,
      name: 'Tablet',
      description: '10-inch tablet',
      price: 300,
      stock: true,
      imgUrl: 'https://example.com/tablet.jpg',
    },
    {
      id: 5,
      name: 'Camera',
      description: 'DSLR camera',
      price: 700,
      stock: true,
      imgUrl: 'https://example.com/camera.jpg',
    },
    {
      id: 6,
      name: 'Smartwatch',
      description: 'Fitness tracking smartwatch',
      price: 250,
      stock: true,
      imgUrl: 'https://example.com/smartwatch.jpg',
    },
    {
      id: 7,
      name: 'Wireless Earbuds',
      description: 'Bluetooth earbuds',
      price: 100,
      stock: true,
      imgUrl: 'https://example.com/earbuds.jpg',
    },
    {
      id: 8,
      name: 'Gaming Console',
      description: 'Next-gen gaming console',
      price: 500,
      stock: false,
      imgUrl: 'https://example.com/console.jpg',
    },
    {
      id: 9,
      name: 'External Hard Drive',
      description: '1TB USB 3.0 hard drive',
      price: 80,
      stock: true,
      imgUrl: 'https://example.com/harddrive.jpg',
    },
    {
      id: 10,
      name: 'Wireless Router',
      description: 'High-speed wireless router',
      price: 120,
      stock: true,
      imgUrl: 'https://example.com/router.jpg',
    },
    {
      id: 11,
      name: 'Electric Toothbrush',
      description: 'Sonic electric toothbrush',
      price: 50,
      stock: true,
      imgUrl: 'https://example.com/toothbrush.jpg',
    },
    {
      id: 12,
      name: 'Coffee Maker',
      description: 'Programmable coffee maker',
      price: 80,
      stock: true,
      imgUrl: 'https://example.com/coffeemaker.jpg',
    },
    {
      id: 13,
      name: 'Bluetooth Speaker',
      description: 'Portable Bluetooth speaker',
      price: 70,
      stock: true,
      imgUrl: 'https://example.com/speaker.jpg',
    },
    {
      id: 14,
      name: 'Fitness Tracker',
      description: 'Activity and sleep tracker',
      price: 100,
      stock: false,
      imgUrl: 'https://example.com/fitnesstracker.jpg',
    },
    {
      id: 15,
      name: 'Drones',
      description: 'Quadcopter drone',
      price: 300,
      stock: true,
      imgUrl: 'https://example.com/drones.jpg',
    },
    {
      id: 16,
      name: 'Bluetooth Keyboard',
      description: 'Wireless Bluetooth keyboard',
      price: 40,
      stock: true,
      imgUrl: 'https://example.com/keyboard.jpg',
    },
    {
      id: 17,
      name: 'Portable Charger',
      description: '10000mAh power bank',
      price: 30,
      stock: true,
      imgUrl: 'https://example.com/portablecharger.jpg',
    },
    {
      id: 18,
      name: 'Smart Thermostat',
      description: 'Programmable smart thermostat',
      price: 150,
      stock: true,
      imgUrl: 'https://example.com/thermostat.jpg',
    },
    {
      id: 19,
      name: 'Electric Scooter',
      description: 'Foldable electric scooter',
      price: 400,
      stock: false,
      imgUrl: 'https://example.com/scooter.jpg',
    },
    {
      id: 20,
      name: 'VR Headset',
      description: 'Virtual reality headset',
      price: 200,
      stock: true,
      imgUrl: 'https://example.com/vrheadset.jpg',
    },
  ];

  findAll(page: number, limit: number) {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const products = this.products;
    if (startIndex >= products.length) {
      return [];
    }
    return products.slice(startIndex, endIndex);
  }

  create(createProductDto: CreateProductDto) {
    const id = this.products.length + 1;
    this.products.push({ id, ...createProductDto });
    return id;
  }

  findOne(id: number) {
    return this.products.find((product) => product.id === id);
  }

  update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return undefined;
    }
    const updatedProduct = {
      ...this.products[productIndex],
      ...updateProductDto,
    };
    this.products[productIndex] = updatedProduct;
    return updatedProduct;
  }

  remove(id: number) {
    const productIndex = this.products.findIndex(
      (product) => product.id === id,
    );
    if (productIndex === -1) {
      return undefined;
    }
    const removedProduct = this.products[productIndex];
    this.products.splice(productIndex, 1);
    return removedProduct;
  }
}
