const express = require("express");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.get("/", (req, res) => {
  res.status(200).json({ error: 'FALSE', msg: "Bem vindo a API 2.0!" });
});

app.all('/getDouble/', async (req, res) => {
  let ret = await gravarRegistros(1)
  res.status(200).json({ error: 'FALSE', ret });
})

const urlPrincipal =
"https://blaze.com/api/roulette_games/history?startDate=2023-05-09T00:00:00.000Z&endDate=2023-05-09T00:59:59.999Z&page=1";

let objetoDados = [];
let totalPaginas = 0;


// await gravarRegistros(qtdPaginas);
// await imprimir();

// utilizado para buscar o total de páginas
async function buscarPagina() {
fetch(urlPrincipal)
  .then((resposta) => resposta.json())
  .then((dados) => {
    totalPaginas = dados.total_pages;
    console.log(totalPaginas);
    gravarRegistros(totalPaginas);
  })
  .catch((erro) => {
    console.error("Erro ao obter dados", erro);
  });
}

async function gravarRegistros(paginas) {
  let url =
    "https://blaze.com/api/roulette_games/history?startDate=2023-05-09T00:00:00.000Z&endDate=2023-05-09T00:09:59.999Z&page=";

  let teste = 0;
  for (let paginaAtual = 1; paginaAtual <= paginas; paginaAtual++) {
    let urlCustomizada = url + paginaAtual;

    fetch(urlCustomizada)
      .then((resposta) => resposta.json())
      .then((dados) => {
        //console.log(dados)
        for (let i = 0; i < dados.records.length; i++) {
          console.log(dados.records[i])
          objetoDados.push(dados.records[i]);
        }
        teste++;
        imprimir(teste);
      })
      .catch((erro) => {
        console.error("Erro ao obter dados", erro);
      });
  }
  return objetoDados;
}

async function imprimir(pag) {
  console.log(pag);
}








app.listen(5000, () => {
  console.log("Running on port 5000.");
});
// Export the Express API
module.exports = app;