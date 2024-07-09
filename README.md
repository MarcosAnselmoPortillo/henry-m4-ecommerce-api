# Henry M4 E-commerce API

Ecommerce API developed in Henry's M4 Backend Web Full Stack course by Marcos Anselmo Portillo.

## Features

- User authentication and authorization using JWT
- CRUD operations for products
- Order processing and management
- TypeORM for database interactions
- Input validation and error handling

## Technologies Used

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [TypeORM](https://typeorm.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Cloudinary](https://cloudinary.com/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Docker](https://www.docker.com/)

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/MarcosAnselmoPortillo/henry-m4-ecommerce-api.git
   cd henry-m4-ecommerce-api
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up the environment variables:
   Create a `.env.development` file in the root directory and add the following variables:
   ```
   DB_NAME=your_database_name
   DB_HOST=your_database_host
   DB_PORT=your_database_port
   DB_USERNAME=your_database_username
   DB_PASSWORD=your_database_password
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   JWT_SECRET=your_jwt_secret
   POSTGRES_PASSWORD=your_postgres_password
   POSTGRES_DB=your_postgres_db_name
   PGADMIN_DEFAULT_EMAIL=your_pgadmin_email
   PGADMIN_DEFAULT_PASSWORD=your_pgadmin_password
   ```
   Make sure to replace the placeholder values with your actual configuration details.

## Running the Server

Start the development server:

```bash
npm run dev
```

The server will be running at `http://localhost:3000`.

## API Routes

### Public Routes

- `GET /`
- `GET /products`
- `GET /products/{id}`
- `POST /auth/signin`
- `POST /auth/signup`

### Regular User Routes

- Public routes
- `PUT /users/{id}`
- `GET /orders/`
- `GET /orders/{id}`
- `POST /orders`

### Admin User Routes

- Regular User Routes
- `GET /users`
- `GET /users/{id}`
- `DELETE /users/{id}`
- `POST /products`
- `GET /products/seeder`
- `PUT /products/{id}`
- `DELETE /products/{id}`
- `POST /categories/seeder`
- `POST /categories`
- `GET /categories`
- `GET /orders/all/admin`
- `POST /files/uploadImage/{productId}`

## Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/your-feature`)
5. Create a new Pull Request

## License

This project is licensed under the MIT License.

## Acknowledgements

This project was developed as part of a course at Henry. Special thanks to the instructors and the Henry community.
