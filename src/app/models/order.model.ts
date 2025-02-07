export interface Order {
    id?: string;
    userId: string;
    items: {
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
    totalPrice: number;
    status: 'Placed' | 'Processing' | 'On the way' | 'Delivered';
    createdAt: string;
}
