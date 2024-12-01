import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit tests", () => {

    it("should create a customer", () => {
        const customer = CustomerFactory.create("John Doe");

        expect(customer).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBeUndefined();
    });

    it("should create a customer with address", () => {
        const address = new Address("123 Street", "12345", "City", "Country");
        const customer = CustomerFactory.createWithAddress("John Doe", address);

        expect(customer).toBeDefined();
        expect(customer.name).toBe("John Doe");
        expect(customer.Address).toBe(address);
    });
})