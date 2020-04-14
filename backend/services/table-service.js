const BaseService = require('./base-service')
const TableModel = require('../models/table')

class TableService extends BaseService {
    model = TableModel

    async standUpFromTable(person, table) {
        person.table.pop()
        table.guests.pull(person)
        await person.save()
        await table.save()
    }

    async sitToTable(person, table) {
        person.table.push(table)
        table.guests.push(person)
        await person.save()
        await table.save()
    }
}

module.exports = new TableService()
