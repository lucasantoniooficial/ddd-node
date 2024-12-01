import Address from "../../../../domain/customer/value-object/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.id,
            name: entity.name,
            street: entity.Address.street,
            city: entity.Address.city,
            state: entity.Address.state,
            zipCode: entity.Address.zip,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        })
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.name,
            street: entity.Address.street,
            city: entity.Address.city,
            state: entity.Address.state,
            zipCode: entity.Address.zip,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints
        }, {
            where: { id: entity.id }
        })
    }

    async find(id: string): Promise<Customer> {
        let customerModel;
        try {
            customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true});
        } catch(error) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(
            customerModel.id,
            customerModel.name
        );

        customer.addRewardPoints(customerModel.rewardPoints);

        customer.changeAddress(new Address(
            customerModel.street,
            customerModel.city,
            customerModel.state,
            customerModel.zipCode
        ));

        if(customerModel.active) {
            customer.activate();
        } else {
            customer.deactivate();
        }

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customers = await CustomerModel.findAll();

        return customers.map(customerModel => {
            const customer = new Customer(
                customerModel.id,
                customerModel.name
            );

            customer.addRewardPoints(customerModel.rewardPoints);

            customer.changeAddress(new Address(
                customerModel.street,
                customerModel.city,
                customerModel.state,
                customerModel.zipCode
            ));

            if(customerModel.active) {
                customer.activate();
            } else {
                customer.deactivate();
            }

            return customer;
        });
    }
    
}