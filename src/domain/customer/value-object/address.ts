export default class Address {

    private _street: string;
    private _city: string;
    private _state: string;
    private _zip: string;

    get street(): string {
        return this._street;
    }

    get city(): string {
        return this._city;
    }

    get state(): string {
        return this._state;
    }

    get zip(): string {
        return this._zip;
    }

    constructor(street: string, city: string, state: string, zip: string) {
        this._street = street;
        this._city = city;
        this._state = state;
        this._zip = zip;

        this.validate();
    }

    private validate() {
        if (!this._street) {
            throw new Error("Street is required");
        }

        if (!this._city) {
            throw new Error("City is required");
        }

        if (!this._state) {
            throw new Error("State is required");
        }

        if (!this._zip) {
            throw new Error("Zip is required");
        }
    }

    toString() {
        return `${this._street}, ${this._city}, ${this._state} ${this._zip}`;
    }
}