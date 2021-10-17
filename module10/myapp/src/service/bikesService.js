
export default class BikesService {
    constructor({ repository: bikesRepository }) {
        this.bikesRepository = bikesRepository
    }

    create(data) {
        return this.bikesRepository.create(data) 
    }

    read(query) {
        return this.bikesRepository.read(query) 
    }

    update(id, data) {
        return this.bikesRepository.update(id, data) 
    }

    delete(id) {
        return this.bikesRepository.delete(id) 
    }
}