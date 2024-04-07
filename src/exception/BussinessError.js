class BussinessError extends Error {
    constructor(message) {
        super(message);
        this.name = 'BussinessError';
    }
}