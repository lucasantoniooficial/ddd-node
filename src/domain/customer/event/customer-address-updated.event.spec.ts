import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerAddressUpdatedEvent from "./customer-address-updated.event";
import SendConsoleLogWhenCustomerAddressIsUpdatedHandler from "./handler/send-console-log-when-customer-address-is-updated.handler";

describe("Customer Address Updated Event Test", () => {

    it("should notify the customer address updated event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new SendConsoleLogWhenCustomerAddressIsUpdatedHandler();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");

        eventDispatcher.register("CustomerAddressUpdatedEvent", eventHandler1);

        const customerAddressUpdatedEvent = new CustomerAddressUpdatedEvent({
            id: "1",
            name: "Customer 1",
            "address": {
                street: "Street 1"
           }
        });

        eventDispatcher.notify(customerAddressUpdatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
    })
});