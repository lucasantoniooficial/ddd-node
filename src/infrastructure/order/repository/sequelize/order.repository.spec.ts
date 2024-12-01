import { Sequelize } from "sequelize-typescript";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import Customer from "../../../../domain/customer/entity/customer";
import Address from "../../../../domain/customer/value-object/address";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import Product from "../../../../domain/product/entity/product";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import Order from "../../../../domain/checkout/entity/order";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderModel from "./order.model";
import OrderItemModel from "./order-items.model";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepository from "./order.repository";

describe("Order Respository Test", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel, ProductModel, OrderModel, OrderItemModel])
        await sequelize.sync();
    })

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Anytown", "Anystate", "12345");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.id, product.name, product.price, 1);

        const order = new Order("1", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({ where: { id: order.id }, include: ["items"]});

        expect(orderModel?.toJSON()).toStrictEqual({
            id: order.id,
            customer_id: order.customerId,
            total: order.total,
            items: [
                {
                    id: orderItem1.id,
                    order_id: order.id,
                    product_id: orderItem1.productId,
                    name: orderItem1.name,
                    price: orderItem1.price,
                    quantity: orderItem1.quantity
                }
            ]
        });
    });

    it("should update an existing order", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Anytown", "Anystate", "12345");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("1", "Product 1", 100);
        
        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.id, product.name, product.price, 1);

        const order = new Order("1", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const updatedProduct = new Product("1", "Product 1 Updated", 200);

        await productRepository.update(updatedProduct);

        const updatedOrderItem1 = new OrderItem("1", updatedProduct.id, updatedProduct.name, updatedProduct.price, 2);

        const updatedOrder = new Order("1", customer.id, [updatedOrderItem1]);

        await orderRepository.update(updatedOrder);

        const orderModel = await OrderModel.findOne({ where: { id: updatedOrder.id }, include: ["items"]});

        expect(orderModel?.toJSON()).toStrictEqual({
            id: updatedOrder.id,
            customer_id: updatedOrder.customerId,
            total: updatedOrder.total,
            items: [
                {
                    id: updatedOrderItem1.id,
                    order_id: updatedOrder.id,
                    product_id: updatedOrderItem1.productId,
                    name: updatedOrderItem1.name,
                    price: updatedOrderItem1.price,
                    quantity: updatedOrderItem1.quantity
                }
            ]
        });
    });

    it("should find an existing order", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Anytown", "Anystate", "12345");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.id, product.name, product.price, 1);

        const order = new Order("1", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.id);

        expect(foundOrder).toStrictEqual(order);
    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        await expect(orderRepository.find("1")).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customer = new Customer("1", "John Doe");
        const address = new Address("123 Main St", "Anytown", "Anystate", "12345");
        customer.changeAddress(address);

        const customerRepository = new CustomerRepository();
        await customerRepository.create(customer);

        const product = new Product("1", "Product 1", 100);

        const productRepository = new ProductRepository();
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.id, product.name, product.price, 1);

        const order = new Order("1", customer.id, [orderItem1]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const customer2 = new Customer("2", "Jane Doe");
        const address2 = new Address("456 Elm St", "Othertown", "Otherstate", "67890");
        customer2.changeAddress(address2);

        await customerRepository.create(customer2);

        const product2 = new Product("2", "Product 2", 150);
        await productRepository.create(product2);

        const orderItem2 = new OrderItem("2", product2.id, product2.name, product2.price, 2);

        const order2 = new Order("2", customer2.id, [orderItem2]);
        await orderRepository.create(order2);

        const allOrders = await orderRepository.findAll();

        expect(allOrders).toStrictEqual([order, order2]);
    });
});