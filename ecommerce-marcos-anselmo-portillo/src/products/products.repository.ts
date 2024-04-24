import { Injectable } from "@nestjs/common";

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
 }