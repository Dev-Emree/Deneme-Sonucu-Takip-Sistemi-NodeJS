let { Schema, model } = require('mongoose');

let TYT_Schema = new Schema({
    examName: {
        type: String,
        default: 'Deneme Sınavı'
    },
    username: {
        type: String,
        index: true,
    },
    public: {
        type: Boolean,
        default: false,
    },
    Date:       {type: String},
    Turkce:     {type: Object, default: {dogru: Number, yanlis: Number, net: Number}},
    Sosyal:     {type: Object, default: {dogru: Number, yanlis: Number, net: Number}},
    Matematik:  {type: Object, default: {dogru: Number, yanlis: Number, net: Number}},
    Fen:        {type: Object, default: {dogru: Number, yanlis: Number, net: Number}},
    Total:      {type: Object, default: {dogru: Number, yanlis: Number, net: Number}},
}, { timeseries: true, timestamps: true });

module.exports = {
    TYT:model("TYT", TYT_Schema)
};