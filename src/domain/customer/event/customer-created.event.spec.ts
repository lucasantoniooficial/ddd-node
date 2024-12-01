import EventDispatcher from "../../@shared/event/event-dispatcher"
import CustomerCreatedEvent from "./customer-created.event";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "./handler/send-console-log1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "./handler/send-console-log2-when-customer-is-created.handler";

describe("Customer Created Event Test", () => {

    it("should notify the customer created event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);

        const customerCreatedEvent = new CustomerCreatedEvent({
            name: "Customer 1",
            "address": "123 Main St, Springfield, IL, 62701"
        });

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();

        const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler2).toHaveBeenCalled();

    })
})