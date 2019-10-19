class PaymentProcessor {
    // payments = [{id, name, type, value}, ...]

    constructor(opts) {
        this.options = opts
        this.payments = []
    }

    set options(opts) {

        this._options = {
            types: ["service", "product", "other"],
            precision: 2
        }

        if (opts) {
            if (opts.types) {
                this._options.types = opts.types
            }

            if (opts.precision) {
                this._options.precision = opts.precision
            }
        }
    }

    registerPayment(id, name, type, value) {
        let idExists = this.payments.find(p => p.id === id)

        if ((typeof id !== 'string' || id.length === 0) ||
            (typeof name !== 'string' || name.length === 0) ||
            (!this._options.types.includes(type)) ||
            typeof value !== 'number' ||
            idExists) {

            throw new Error('Incorrect data!')
        }

        if (!idExists) {
            let newPayment = { id, name, type, value }
            this.payments.push(newPayment)
        }
    }

    deletePayment(id) {
        let idIndex = this.payments.findIndex(p => p.id === id)

        if (idIndex >= 0) {
            this.payments.splice(idIndex, 1)

        } else {
            throw new Error('The given ID was not found!')
        }
    }

    get(id) {
        let idIndex = this.payments.findIndex(p => p.id === id)

        if (idIndex >= 0) {
            let value = this.payments[idIndex].value

            return `Details about payment ID: ${id}\n` +
                `- Name: ${this.payments[idIndex].name}\n` +
                `- Type: ${this.payments[idIndex].type}\n` +
                `- Value: ${value.toFixed(this._options.precision)}`

        } else {
            throw new Error('The given ID was not found!')
        }
    }

    setOptions(options) {   // object
        if (options.types) {
            this._options.types = options.types
        }

        if (options.precision) {
            this._options.precision = options.precision
        }
    }

    toString() {
        let balance = 0
        this.payments.map(p => balance += p.value)

        return 'Summary:\n' +
            `- Payments: ${this.payments.length}\n` +
            `- Balance: ${balance.toFixed(this._options.precision)}`
    }
}
//* Initialize processor with default options
// const generalPayments = new PaymentProcessor();
// generalPayments.registerPayment('0001', 'Microchips', 'product', 15000);
// generalPayments.registerPayment('01A3', 'Biopolymer', 'product', 23000);
// console.log(generalPayments.toString());
//
//* Should throw an error (invalid type)
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'materials', 8000);
//
// generalPayments.setOptions({ types: ['product', 'material'] });
// generalPayments.registerPayment('E028', 'Rare-earth elements', 'material', 8000);
// console.log(generalPayments.get('E028'));
// generalPayments.registerPayment('CF15', 'Enzymes', 'material', 55000);
//
//* Should throw an error (ID not found)
// generalPayments.deletePayment('E027');
//* Should throw an error (ID not found)
// generalPayments.get('E027');
//
// generalPayments.deletePayment('E028');
// console.log(generalPayments.toString());
//
//* Initialize processor with custom types
// const servicePyaments = new PaymentProcessor({ types: ['service'] });
// console.log(servicePyaments);
// servicePyaments.registerPayment('01', 'HR Consultation', 'service', 3000);
// servicePyaments.registerPayment('02', 'Discount', 'service', -1500);
// console.log(servicePyaments.toString());
//
//* Initialize processor with custom precision
// const transactionLog = new PaymentProcessor({ precision: 5 });
// transactionLog.registerPayment('b5af2d02-327e-4cbf', 'Interest', 'other', 0.00153);
// console.log(transactionLog.toString());