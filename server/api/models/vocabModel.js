const mongoose = require('mongoose');
const {Schema} = mongoose;

const VovabSchema = new Schema({
    english:{
        type: String,
        required: "English word is required",
    },
    german:{
        type: String,
        required: "German word is required",
    },
    vietnamese:{
        type: String,
        required: "Vietnamese word is required",
    },
},
{collection: 'vocal-3l'});

module.exports = mongoose.model('Vocab', VovabSchema);