import {v4 as uuid} from "uuid";
import Customer from "../entity/customer";

export default class CustomerFactory {
    static create(name: string): Customer {
        return new Customer(uuid(), name);
    }

    static createWithAddress(name: string, address: any): Customer {
        const customer = new Customer(uuid(), name);
        customer.changeAddress(address);

        return customer;
    }
}