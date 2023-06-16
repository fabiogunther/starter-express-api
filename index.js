const express = require("express");
const mongoose = require("mongoose");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const {speedway1xbet_results} = require('./models/Speedway1xbet');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	next();
});

app.get("/", (req, res) => {
  	res.status(200).json({ error: 'FALSE', msg: "Bem vindo a API 2.0!" });
});

app.post("/speedway/1xbet/next", async (req, res) => {
    const received = req.body;
    console.log(`Recebido ${received.race_date}`)
    const raceExists = await speedway1xbet_results.findOne({ race_id: received.race_id });

    if (!raceExists) {
        const race = new speedway1xbet_results({
            race_id: received.race_id,
            race_date: new Date(`${received.race_date}Z`),
            p1_id: received.p1_id,
            p2_id: received.p2_id,
            p3_id: received.p3_id,
            p4_id: received.p4_id,
            p1_name: received.p1_name,
            p2_name: received.p2_name,
            p3_name: received.p3_name,
            p4_name: received.p4_name,
            odd_1: received.p1_odd,
            odd_2: received.p2_odd,
            odd_3: received.p3_odd,
            odd_4: received.p4_odd,
            oddpodio_1: received.p1_odd_podio,
            oddpodio_2: received.p2_odd_podio,
            oddpodio_3: received.p3_odd_podio,
            oddpodio_4: received.p4_odd_podio
        });
        try {
            await race.save({ timestamps: { createdAt: true, updatedAt: false } });  
            res.status(200).json({ error: 'FALSE', msg: "Salvo com Sucesso!" }); 
        } catch (error) {
            res.status(500).json({ error: 'TRUE', msg: error });
        }
    } else {
        res.status(200).json({ error: 'FALSE', msg: "Corrida Existente!" });
    } 
    
});

app.post("/speedway/1xbet/result", async (req, res) => {
    const received = req.body;
    console.log(`Recebido ${received.race_id}`)
    try {
        await speedway1xbet_results.updateOne(
            { race_id: received.race_id, updatedAt: undefined },
            { result_1: received.result_1, result_2: received.result_2, result_3: received.result_3, result_4: received.result_4, odd_previsao: received.odd_previsao }
        )  
        res.status(200).json({ error: 'FALSE', msg: "Salvo com Sucesso!" }); 
    } catch (error) {
        res.status(500).json({ error: 'TRUE', error });
    }
});

app.get("/speedway/1xbet/lasts/:qtd", async (req, res) => {
    const qtd = req.params.qtd;  
    const races = await speedway1xbet_results.find({odd_previsao: {$gt: 0}}).sort({race_date: -1}).limit(qtd); 
    res.status(200).json({ error: 'FALSE', races });
});

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASS;
const port = process.env.PORT || 5000;

mongoose.connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cluster0.euobd.mongodb.net/?retryWrites=true&w=majority`
  );

const speedway_db = mongoose.connection;

speedway_db.on('error', console.error.bind(console, 'connection to SpeedWayDB error:'));
speedway_db.once('open', () => {
  console.log('Connected to SpeedWayDB!');
});

app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;