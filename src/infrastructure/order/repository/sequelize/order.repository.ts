
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-items.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.id,
            customer_id: entity.customerId,
            total: entity.total,
            items: entity.items.map(item => ({
                id: item.id,
                product_id: item.productId,
                name: item.name,
                price: item.price,
                quantity: item.quantity
            }))
        },{
            include: [{ model: OrderItemModel}]
        });
    }
    async update(entity: Order): Promise<void> {

        await OrderItemModel.destroy({
            where: { order_id: entity.id }
        })

        await OrderItemModel.bulkCreate(entity.items.map(item => ({
            id: item.id,
            order_id: entity.id,
            product_id: item.productId,
            name: item.name,
            price: item.price,
            quantity: item.quantity
        })));

        await OrderModel.update({
            customer_id: entity.customerId,
            total: entity.total,
        },{
            where: { id: entity.id },
        });
    }

    async find(id: string): Promise<Order> {
        let orderModel;

        try {
            orderModel = await OrderModel.findOne({ where: { id }, include: ["items"], rejectOnEmpty: true });
        } catch (error) {
            throw new Error("Order not found");
        }
        
        const items = orderModel.items.map((item: any) => new OrderItem(
            item.id,
            item.product_id,
            item.name,
            item.price,
            item.quantity
        ));

        const order = new Order(orderModel.id, orderModel.customer_id, items);

        return order;
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({ include: ["items"] });

        return orderModels.map((orderModel: any) => {
            const items = orderModel.items.map((item: any) => new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            ));

            return new Order(orderModel.id, orderModel.customer_id, items);
        });
    }
    
}