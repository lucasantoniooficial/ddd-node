import { Sequelize } from "sequelize-typescript";
import CustomerModel from "./customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "./customer.repository";

describe("Customer Repository tests", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a customer", async () => {

        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe",
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            active: true,
            rewardPoints: 0
        });
    });

    it("should activate a customer", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        customer.deactivate();
        
        await customerRepository.update(customer);

        customer.activate();

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe",
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            active: true,
            rewardPoints: 0
        });
    });

    it("should deactivate a customer", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        customer.deactivate();

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe",
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            active: false,
            rewardPoints: 0
        });
    });

    it("should add reward points to a customer", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        customer.addRewardPoints(100);

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "John Doe",
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            active: true,
            rewardPoints: 100
        });
    });

    it("should change the name of a customer", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        customer.changeName("Jane Doe");

        await customerRepository.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "1"} });

        expect(customerModel?.toJSON()).toStrictEqual({
            id: "1",
            name: "Jane Doe",
            street: "123 Main St",
            city: "Springfield",
            state: "IL",
            zipCode: "62701",
            active: true,
            rewardPoints: 0
        });
    });

    it("should find a customer by id", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Springfield", "IL", "62701");
        customer.Address = address;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer);

        const foundCustomer = await customerRepository.find("1");

        expect(foundCustomer).toStrictEqual(customer);
    });

    it("should throw an error when customer is not found", async () => {
        const customerRepository = new CustomerRepository();
        expect(async () => {
            await customerRepository.find("1")
        }).rejects.toThrow("Customer not found");
    });

    it("should find all customers", async () => {
        const customer1 = new Customer("1", "John Doe");
        const address1 = new Address("123 Main St", "Springfield", "IL", "62701");
        customer1.Address = address1;

        const customer2 = new Customer("2", "Jane Doe");
        const address2 = new Address("123 Main St", "Springfield", "IL", "62701");
        customer2.Address = address2;

        const customerRepository = new CustomerRepository();

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const customers = await customerRepository.findAll();

        expect(customers).toStrictEqual([customer1, customer2]);
    });
});