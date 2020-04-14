const BaseService = require('./base-service')
const PersonModel = require('../models/guest')

class PersonService extends BaseService {
    model = PersonModel 
}

module.exports = new PersonService()
