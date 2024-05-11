import { ApiProperty } from "@nestjs/swagger";
import { Order } from "../entities/order.entity";

export class CreateOrderResponseDto {
    @ApiProperty({
        description: 'Order created successfully',
        type: Order
    })
    order: Order;

    @ApiProperty({
        example: ['5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f', '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f'],
        description: 'List of products not found',
        type: [String],
    })
    productsNotFound: string[];

    @ApiProperty({
        example: ['5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f', '5e9f8f6f-9f8f-9f8f-9f8f-9f8f9f9f9f9f'],
        description: 'List of products out of stock',
        type: [String],
    })
    productsOutOfStock: string[];
}