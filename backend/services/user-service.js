const BaseService = require('./base-service')
const UserModel = require('../models/user')

class UserService extends BaseService {
    model = UserModel 
}

module.exports = new UserService()
