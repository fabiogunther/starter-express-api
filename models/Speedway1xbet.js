const mongoose = require('mongoose')
//const AutoIncrement = require('mongoose-sequence')(mongoose);

const myDB = mongoose.connection.useDb('Speedway');

const raceSchema = mongoose.Schema(
    {
        race_id: {type: Number, unique : true, dropDups: true},
        race_date: {type: Date, unique : true, dropDups: true},
        p1_id: Number,
        p2_id: Number,
        p3_id: Number,
        p4_id: Number,
        p1_name: String,
        p2_name: String,
        p3_name: String,
        p4_name: String,
        odd_1: Number,
        odd_2: Number,
        odd_3: Number,
        odd_4: Number,
        oddpodio_1: Number,
        oddpodio_2: Number,
        oddpodio_3: Number,
        oddpodio_4: Number,
        result_1: Number,
        result_2: Number,
        result_3: Number,
        result_4: Number,
        odd_previsao: Number       

    },
    {
        timestamps: true,
        versionKey: false
    }
);

const speedway1xbet_results = myDB.model('Results', raceSchema)

module.exports = {
    speedway1xbet_results: speedway1xbet_results
}