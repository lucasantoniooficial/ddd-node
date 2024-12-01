import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order service unit tests", () => {

    it("should place an order", () => {

        const customer = new Customer("1", "customer1");
        const orderItem1 = new OrderItem("1", "1", "item1", 100, 2);

        const order = OrderService.placeOrder(customer, [orderItem1]);

        expect(customer.rewardPoints).toBe(100);
        expect(order.total).toBe(200);
    });

    it("should get total of all orders", () => {

        const orderItem1 = new OrderItem("1", "1", "item1", 100, 2);
        const orderItem2 = new OrderItem("2", "2", "item2", 200, 1);
        
        const order1 = new Order("1", "1", [orderItem1]);
        const order2 = new Order("2", "2", [orderItem2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(400);
    });
});