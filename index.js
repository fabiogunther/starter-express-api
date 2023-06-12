const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.status(200).json({ error: 'FALSE', msg: "Bem vindo a API 2.0!" });
});

app.all('/getDouble/', (req, res) => {
  let ret = buscarNextsLeap()
  res.status(200).json({ error: 'FALSE', ret });
})

async function buscarNextsLeap() {
  let urlPrincipal = 'https://lb.1x2networkhubmalta.com/f1x2games//virtualsport_fralis/getRacesDetailedJSON.jsp?sport_id=3&num_forward=20&install_id=1&siteID=4500'
  await fetch(urlPrincipal)
    .then((resposta) => resposta.json())
    .then((dados) => {
      //totalPaginas = dados.total_pages;
      return dados;
      //gravarRegistros(totalPaginas);
    })
    .catch((erro) => {
      console.error("Erro ao obter dados", erro);
    });
}

app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;