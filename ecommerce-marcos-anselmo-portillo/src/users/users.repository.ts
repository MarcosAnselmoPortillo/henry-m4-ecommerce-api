import { Injectable } from "@nestjs/common";

@Injectable()
export class UsersRepository { 
    private users = [
        {
          id: 1,
          email: "user1@example.com",
          name: "John Doe",
          password: "password123",
          address: "123 Main St",
          phone: "123-456-7890",
          country: "USA",
          city: "New York"
        },
        {
          id: 2,
          email: "user2@example.com",
          name: "Jane Doe",
          password: "password456",
          address: "456 Elm St",
          phone: "098-765-4321",
          country: "Canada",
          city: "Toronto"
        },
        {
          id: 3,
          email: "user3@example.com",
          name: "Alice Smith",
          password: "password789",
          address: "789 Oak St",
          phone: "111-222-3333"
        },
        {
          id: 4,
          email: "user4@example.com",
          name: "Bob Johnson",
          password: "passwordabc",
          address: "101 Pine St",
          phone: "444-555-6666",
          country: "UK"
        },
        {
          id: 5,
          email: "user5@example.com",
          name: "Emily Wilson",
          password: "passworddef",
          address: "202 Cedar St",
          phone: "777-888-9999",
          city: "Sydney"
        }
      ];

      findAll() {
        return this.users;
      }
}