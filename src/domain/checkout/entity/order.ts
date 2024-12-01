import OrderItem from "./order_item";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _total: number;
    private _items: OrderItem[];

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get total(): number {
        return this._total;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.orderTotal();

        this.validate();
    }

    private validate() {
        if (!this._id) {
            throw new Error("ID is required");
        }

        if (!this._customerId) {
            throw new Error("Customer ID is required");
        }

        if (!this._items || this._items.length === 0) {
            throw new Error("Items are required");
        }

        if(this._items.some(item => item.quantity <= 0)) {
            throw new Error("Item quantity must be greater than 0");
        }
    }

    private orderTotal(): number {
        return this._items.reduce((total, item: OrderItem) => total + item.orderItemTotal(), 0);
    }
}