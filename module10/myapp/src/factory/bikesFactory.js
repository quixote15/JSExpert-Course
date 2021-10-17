
import BikesService from '../service/bikesService.js'
import BikesRepository from '../repository/bikesRepository.js'

export default class BikesFactory {
    static getInstance() {
        const repository = new BikesRepository()
        const service = new BikesService({ repository })
        return service
    }
}