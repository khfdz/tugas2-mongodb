const mongoose = require('mongoose')

const Schema = mongoose.Schema

const bukuSchema = new Schema({
    judul: {
        type: String,
        required: true
    },
    penulis: {
        type: String,
        required: true
    },
    penerbit: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    }
},
{
    timestamps: true
})

module.exports = mongoose.model("Buku", bukuSchema)