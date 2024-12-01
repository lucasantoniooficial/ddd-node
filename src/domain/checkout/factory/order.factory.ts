import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface IOrderProps {
    id: string;
    customerId: string;
    items: {
        id: string;
        productId: string;
        name: string;
        price: number;
        quantity: number;
    }[];
}

export default class OrderFactory {
    static create(orderProps: IOrderProps): Order {
        const items = orderProps.items.map(item => new OrderItem(item.id, item.productId, item.name, item.price, item.quantity));
        
        return new Order(orderProps.id, orderProps.customerId, items);
    }
}