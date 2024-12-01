import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressUpdated from "../customer-address-updated.event";

export default class SendConsoleLogWhenCustomerAddressIsUpdatedHandler implements EventHandlerInterface<CustomerAddressUpdated> {
    handle(event: CustomerAddressUpdated): void {
        console.log("Esse é o console.log do evento: CustomerAddressUpdated")
    }
}