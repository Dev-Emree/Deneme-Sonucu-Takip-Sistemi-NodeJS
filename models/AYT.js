let { Schema, model } = require('mongoose');

let AYT_Schema = new Schema({
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
        default: false
    },
    Date:       {type: String},
    Turkce:     {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
    Sosyal:     {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
    Matematik:  {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
    Fen:        {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
    MF_Total:   {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
    TM_Total:   {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
    TS_Total:   {type: Object, default: {dogru: 0, yanlis: 0, net: 0}},
}, { timeseries: true, timestamps: true });

module.exports = {
    AYT:model("AYT", AYT_Schema)
};