
export default class Cart {
    constructor(name, email) {
        this.nae = name;
        this.email = email;
    }

    validate() {
        if(!this.name || this.email) throw new Error('Name, email are required');

        if(this.name.length < 4) throw new Error('Name must have at least 4 chars')

    }

}