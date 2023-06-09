const express = require('express')
const http = require("https");
const app = express()
app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo!')
})

app.all('/getDouble/', (req, res) => {
    res.send(getDouble())
})

function getDouble(){
    const url = 'https://blaze.com/api/roulette_games/history?startDate=2023-05-10T12:08:43.084Z&endDate=2023-06-10T12:00:43.084Z&page=1';

    let result = '';
    const req = http.request(url, (res) => {
        console.log(res.statusCode);

        res.setEncoding('utf8');
        res.on('data', (chunk) => {
            result += chunk;
        });

        res.on('end', () => {
            console.log(result);
        });
    });

    req.on('error', (e) => {
        console.error(e);
    });

    req.end();

    return result
}
app.listen(process.env.PORT || 3000)