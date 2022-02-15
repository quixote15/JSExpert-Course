
export default class Cart {
    constructor(name, email) {
        this.name = name;
        this.email = email;
    }

    validate() {
        const errors = []
        if(!this.name || this.email) errors.push('Name, email are required');

        if(this.name.length < 4) errors.push('Name must be at least 4 charactershave at least 4 chars')

        return {data: this, errors}

    }

}