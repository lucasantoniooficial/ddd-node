import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it("should throw when id is empty", () => {
        expect(() => {
            new Order("", "customerId", []);
        }).toThrowError("ID is required"); 
    })  

    it("should throw when customerId is empty", () => {
        expect(() => {
            new Order("1", "", []);
        }).toThrowError("Customer ID is required"); 
    });

    it("should throw when items are empty", () => {
        expect(() => {
            new Order("1", "1", []);
        }).toThrowError("Items are required"); 
    });

    it("should calculate total", () => {
        const item1 = new OrderItem("1", "1", "item1", 10, 2);
        const item2 = new OrderItem("2", "2", "item2", 20, 1);

        const order = new Order("1", "1", [item1, item2]);

        expect(order.total).toBe(40);
    });

    it("should throw error if the item quantity is less than or equal to 0", () => {
        expect(() => {
          const orderItem = new OrderItem("1", "1", "item1", 10, -1);
          new Order("1", "1", [orderItem]);
        }).toThrowError("Item quantity must be greater than 0");

        expect(() => {
            const orderItem = new OrderItem("1", "1", "item1", 10, 0);
            new Order("1", "1", [orderItem]);
        }).toThrowError("Item quantity must be greater than 0");
    });
})