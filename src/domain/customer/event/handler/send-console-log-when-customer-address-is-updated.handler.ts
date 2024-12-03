import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Customer from "../../entity/customer";
import CustomerAddressUpdated from "../customer-address-updated.event";

export default class SendConsoleLogWhenCustomerAddressIsUpdatedHandler implements EventHandlerInterface<CustomerAddressUpdated> {
    handle(event: CustomerAddressUpdated): void {
        const customer = new Customer(event.eventData.id, event.eventData.name);
        customer.changeAddress(event.eventData.address.street);
        console.log(`Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address.street}`);
    }
}