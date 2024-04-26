import { Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { Product } from "./products.interface";

@Injectable()
export class ProductsRepository {
    private products = [
        {
          id: 1,
          name: "Laptop",
          description: "High-performance laptop",
          price: 1200,
          stock: true,
          imgUrl: "https://example.com/laptop.jpg"
        },
        {
          id: 2,
          name: "Smartphone",
          description: "Latest smartphone model",
          price: 800,
          stock: true,
          imgUrl: "https://example.com/smartphone.jpg"
        },
        {
          id: 3,
          name: "Headphones",
          description: "Noise-cancelling headphones",
          price: 150,
          stock: false,
          imgUrl: "https://example.com/headphones.jpg"
        },
        {
          id: 4,
          name: "Tablet",
          description: "10-inch tablet",
          price: 300,
          stock: true,
          imgUrl: "https://example.com/tablet.jpg"
        },
        {
          id: 5,
          name: "Camera",
          description: "DSLR camera",
          price: 700,
          stock: true,
          imgUrl: "https://example.com/camera.jpg"
        }
      ];

      findAll() {
        return this.products;
      }

      create(createProductDto: CreateProductDto) {
        const id = this.products.length + 1;
        this.products.push({ id, ...createProductDto });
        return id;
      }

      findOne(id: number) {
        return this.products.find(product => product.id === id);
      }

      update(id: number, updateProductDto: UpdateProductDto): Product | undefined {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
          return undefined;
        }
        const updatedProduct = {
          ...this.products[productIndex],
          ...updateProductDto
        };
        this.products[productIndex] = updatedProduct;
        return updatedProduct;
      }

      remove(id: number) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
          return undefined;
        }
        const removedProduct = this.products[productIndex];
        this.products.splice(productIndex, 1);
        return removedProduct;
      }
 }