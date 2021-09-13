import Record from './Record';

class Contact extends Record {

    phoneNumber: string;

    constructor() {
        super();
        this.phoneNumber = '';
    }
}

export default Contact;