import {v4 as uuid} from "uuid";
import Order from "../entity/order";
import OrderFactory from "./order.factory";

describe("Order Factory Unit tests", () => {

    it("should create an order", () => {

        const orderProps = {
            id: uuid(),
            customerId: uuid(),
            items: [
                {
                    id: uuid(),
                    productId: uuid(),
                    name: "Product 1",
                    price: 100,
                    quantity: 2
                },
                {
                    id: uuid(),
                    productId: uuid(),
                    name: "Product 2",
                    price: 200,
                    quantity: 1
                }
            ]
        }

        const order = OrderFactory.create(orderProps);

        expect(order.id).toBe(orderProps.id);
        expect(order.customerId).toBe(orderProps.customerId);
        expect(order.items.length).toBe(2);
        expect(order.total).toBe(400);
    })
})