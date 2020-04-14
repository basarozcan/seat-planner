const mongoose = require('mongoose')

const TableSchema = new mongoose.Schema({
    name: String,
    location: String,
    guests: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Person',
        autopopulate: {
            maxDepth: 1
        }
    }],
    dashboard: []
})

TableSchema.plugin(require('mongoose-autopopulate'))

const TableModel = mongoose.model('Table', TableSchema)

module.exports = TableModel
