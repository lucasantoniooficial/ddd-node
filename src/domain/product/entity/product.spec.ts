import Product from "./product";

describe("Product unit tests", () => {

    it("should throw when id is empty", () => {
        expect(() => {
            new Product("", "name", 10);
        }).toThrowError("ID is required"); 
    });

    it("should throw when name is empty", () => {
        expect(() => {
            new Product("1", "", 10);
        }).toThrowError("Name is required"); 
    });

    it("should throw when price is less than zero", () => {
        expect(() => {
            new Product("1", "name", 0);
        }).toThrowError("Price is less than or equal to zero"); 
    });

    it("should product change name", () => {
        const product = new Product("1", "name", 10);
        product.changeName("new name");
        expect(product.name).toBe("new name");
    });

    it("should throw when name is empty after change name", () => {
        const product = new Product("1", "name", 10);
        expect(() => {
            product.changeName("");
        }).toThrowError("Name is required"); 
    });

    it("should product change price", () => {
        const product = new Product("1", "name", 10);
        product.changePrice(20);
        expect(product.price).toBe(20);
    });

    it("should throw when price is less than zero after change price", () => {
        const product = new Product("1", "name", 10);
        expect(() => {
            product.changePrice(0);
        }).toThrowError("Price is less than or equal to zero"); 
    });
});