let { Schema, model } = require('mongoose');

let YDT_Schema = new Schema({
    examName: {
        type: String,
        default:'Deneme Sınavı'
    },
    username: {
        type: String,
        index: true,
    },
    public: {
        type: Boolean,
        default: false,
    },
    lang: {
        type: String,
        default:'İngilizce'
    },
    Date:{type: String},
    Total: {
        type: Object,
        default: {dogru: Number,yanlis: Number,net:Number}
    }
}, { timeseries: true, timestamps: true });

module.exports = {
    YDT:model("YDT", YDT_Schema)
};