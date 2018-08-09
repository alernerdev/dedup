const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    title: String,
    content: String,
    url: Array,
    published: Date,
    hash: {
        type: String,
        index: {
            unique: true
        }
    }
});

mongoose.model('articles', articleSchema);