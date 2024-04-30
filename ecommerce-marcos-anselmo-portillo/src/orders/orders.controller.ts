import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async findAll() {
        return await this.ordersService.findAll();
    }

    @Get(':id')
    async getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.findOne(id);
    }

    @Post()
    async addOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }
}
