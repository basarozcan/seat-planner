const mongoose = require('mongoose')

const PersonSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    qty: {
        type: Number,
        required: true,
        min: 1,
        default: 1
    },
    tags: [],
    table: [{
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Table',
        autopopulate: {
            maxDepth: 1
        }
    }],
    type: {
        type: String,
        default: 'Other'
    }
})

PersonSchema.plugin(require('mongoose-autopopulate'))

const PersonModel = mongoose.model('Person', PersonSchema)

module.exports = PersonModel
