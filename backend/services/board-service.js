const BaseService = require('./base-service')
const BoardModel = require('../models/board')

class BoardService extends BaseService {
    model = BoardModel 
}

module.exports = new BoardService()
