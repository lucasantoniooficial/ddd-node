import Address from "../value-object/address";

export default class Customer {
    private _id: string;
    private _name: string;
    private _address!: Address;
    private _active: boolean = true;
    private _rewardPoints: number = 0;

    get id(): string {
        return this._id;
    }
    
    get name(): string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    get Address(): Address {
        return this._address;
    }

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;

        this.validate();
    }

    validate() {
        if (!this._id) {
            throw new Error("ID is required");
        }

        if (!this._name) {
            throw new Error("Name is required");
        }
    }

    changeName(name: string) {
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address) {
        this._address = address;
    }

    activate() {
        if(this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer");
        }

        this._active = true;
    }

    deactivate() {
        this._active = false;
    }

    isActive(): Boolean {
        return this._active;
    }

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    set Address(address: Address) {
        this._address = address;
    }
}
