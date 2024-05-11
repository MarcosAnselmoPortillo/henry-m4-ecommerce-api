import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { AuthGuard } from 'src/guards/auth.guard';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from './entities/order.entity';
import { CreateOrderResponseDto } from './dto/create-order-response.dto';

@ApiTags('orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @ApiResponse({
        status: 201,
        description: 'Get all orders successfully',
        type: [CreateOrderDto],
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get()
    async findAll(): Promise<Order[]> {
        return await this.ordersService.findAll();
    }

    @ApiResponse({
        status: 200,
        description: 'Get order successfully',
        type: Order,
    })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Order not found' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(':id')
    async getOrder(@Param('id', ParseUUIDPipe) id: string): Promise<Order> {
        return await this.ordersService.findOne(id);
    }

    @ApiResponse({
        status: 201,
        description: 'Create order successfully',
        type: CreateOrderResponseDto,
    })
    @ApiResponse({ status: 400, description: 'Bad request' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Products not found or out of stock' })
    @ApiResponse({ status: 500, description: 'Error creating order' })
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Post()
    @ApiBody({ type: CreateOrderDto })
    async addOrder(@Body() createOrderDto: CreateOrderDto): Promise<CreateOrderResponseDto> {
        return await this.ordersService.create(createOrderDto);
    }
}
