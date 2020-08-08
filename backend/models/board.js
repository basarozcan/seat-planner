const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    tables: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Table',
        autopopulate: {
            maxDepth: 1
        }
    }],
    owner_id: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        autopopulate: {
            maxDepth: 1
        }
    }],
})
BoardSchema.plugin(require('mongoose-autopopulate'))

const BoardModel = mongoose.model('Board', BoardSchema)

module.exports = BoardModel
