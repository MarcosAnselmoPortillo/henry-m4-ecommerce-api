import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async findAll() {
        return await this.ordersService.findAll();
    }

    @UseGuards(AuthGuard)
    @Get(':id')
    async getOrder(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Post()
    async addOrder(@Body() createOrderDto: CreateOrderDto) {
        return await this.ordersService.create(createOrderDto);
    }
}
