const mongoose = require('mongoose')

const BoardSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2
    },
    owner_id: String
})
// BoardSchema.plugin(require('mongoose-autopopulate'))

const BoardModel = mongoose.model('Board', BoardSchema)

module.exports = BoardModel
