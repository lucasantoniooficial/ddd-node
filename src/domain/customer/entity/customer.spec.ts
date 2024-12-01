import Address from "../value-object/address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => {

        expect(() => {
            const customer = new Customer("", "John Doe");
        }).toThrowError("ID is required");
    });

    it("should throw error when name is empty", () => {

        expect(() => {
            const customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", () => {

        const customer = new Customer("123", "John Doe");
        customer.changeName("Jane Doe");

        expect(customer.name).toBe("Jane Doe");
    });

    it("should activate customer", () => {

        const customer = new Customer("1", "Customer 1");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        customer.activate();

        expect(customer.isActive()).toBe(true);
    });

    it("should throw error when address is undefined", () => {
        expect(() => {
            const customer = new Customer("1", "Customer 1");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should deactivate customer", () => {

        const customer = new Customer("1", "Customer 1");

        customer.deactivate();

        expect(customer.isActive()).toBe(false);
    });

    it("shoud add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(100);

        expect(customer.rewardPoints).toBe(100);

        customer.addRewardPoints(200);

        expect(customer.rewardPoints).toBe(300);
    });
})