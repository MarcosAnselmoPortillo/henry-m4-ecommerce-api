import { Injectable } from '@nestjs/common';
import { User } from './users.interface';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { log } from 'console';

@Injectable()
export class UsersRepository {
  
  private users: User[] = [
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
    },
    {
      id: 6,
      email: "user6@example.com",
      name: "Michael Brown",
      password: "password123",
      address: "456 Maple St",
      phone: "333-444-5555",
      country: "USA",
      city: "Los Angeles"
    },
    {
      id: 7,
      email: "user7@example.com",
      name: "Sarah Taylor",
      password: "password456",
      address: "789 Cherry St",
      phone: "666-777-8888",
      country: "Canada",
      city: "Vancouver"
    },
    {
      id: 8,
      email: "user8@example.com",
      name: "David Lee",
      password: "password789",
      address: "101 Walnut St",
      phone: "999-000-1111"
    },
    {
      id: 9,
      email: "user9@example.com",
      name: "Sophia Hernandez",
      password: "passwordabc",
      address: "202 Birch St",
      phone: "222-333-4444",
      country: "Mexico",
      city: "Mexico City"
    },
    {
      id: 10,
      email: "user10@example.com",
      name: "Daniel Martinez",
      password: "passworddef",
      address: "303 Oak St",
      phone: "555-666-7777",
      city: "Buenos Aires"
    },
    {
      id: 11,
      email: "user11@example.com",
      name: "Alexis Nguyen",
      password: "password123",
      address: "404 Pine St",
      phone: "777-888-9999",
      country: "USA",
      city: "Chicago"
    },
    {
      id: 12,
      email: "user12@example.com",
      name: "Luisa Garcia",
      password: "password456",
      address: "505 Maple St",
      phone: "111-222-3333",
      country: "Mexico",
      city: "Guadalajara"
    },
    {
      id: 13,
      email: "user13@example.com",
      name: "Ryan Walker",
      password: "password789",
      address: "606 Elm St",
      phone: "444-555-6666",
      country: "Canada",
      city: "Montreal"
    },
    {
      id: 14,
      email: "user14@example.com",
      name: "Ella Robinson",
      password: "passwordabc",
      address: "707 Oak St",
      phone: "999-000-1111",
      city: "London"
    },
    {
      id: 15,
      email: "user15@example.com",
      name: "Gabriel Taylor",
      password: "passworddef",
      address: "808 Cherry St",
      phone: "222-333-4444",
      country: "Australia",
      city: "Melbourne"
    },
    {
      id: 16,
      email: "user16@example.com",
      name: "Olivia Martinez",
      password: "password123",
      address: "909 Walnut St",
      phone: "555-666-7777",
      city: "Madrid"
    },
    {
      id: 17,
      email: "user17@example.com",
      name: "Noah Brown",
      password: "password456",
      address: "1010 Maple St",
      phone: "777-888-9999",
      country: "USA",
      city: "Seattle"
    },
    {
      id: 18,
      email: "user18@example.com",
      name: "Ava Nguyen",
      password: "password789",
      address: "1111 Elm St",
      phone: "111-222-3333",
      country: "Canada",
      city: "Ottawa"
    },
    {
      id: 19,
      email: "user19@example.com",
      name: "James Hernandez",
      password: "passwordabc",
      address: "1212 Oak St",
      phone: "444-555-6666",
      country: "Mexico",
      city: "Tijuana"
    },
    {
      id: 20,
      email: "user20@example.com",
      name: "Isabella Smith",
      password: "passworddef",
      address: "1313 Pine St",
      phone: "999-000-1111",
      city: "Paris"
    }
  ];

  findAll(page: number, limit: number): User[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;   
    const users = this.users;
    if (startIndex >= users.length) {
      return [];
    }
    return users.slice(startIndex, endIndex);
  }

  findOne(id: number): User {
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const id = this.users.length + 1;
    this.users.push({ id, ...createUserDto });
    return id;
  }

  update(id: number, updateUserDto: UpdateUserDto): User | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const updatedUser = {
      ...this.users[userIndex],
      ...updateUserDto,
    };
    this.users[userIndex] = updatedUser;
    return updatedUser;
  }

  remove(id: number) {
    const userIndex = this.users.findIndex(user => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    const removedUser = this.users[userIndex];
    this.users.splice(userIndex, 1);
    return removedUser;
  }
}