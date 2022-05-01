import express from "express";

const extrato = [
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 210.30, data: "14/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 500.00, data: "14/01/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 704.30, data: "20/01/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 600.00, data: "30/01/2022", tipo: "entrada" },
  { cliente: 'Beltrano', movimentacao: 200.50, data: "02/02/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 42.80, data: "02/02/2022", tipo: "saida" },
  { cliente: 'Beltrano', movimentacao: 100.00, data: "04/02/2022", tipo: "entrada" },
  { cliente: 'Fulano', movimentacao: 20.10, data: "11/02/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/02/2022", tipo: "entrada" },
  { cliente: 'Fulano', movimentacao: 30.30, data: "21/02/2022", tipo: "saida" },
  { cliente: 'Beltrano', movimentacao: 300.20, data: "25/02/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 100.60, data: "30/02/2022", tipo: "entrada" },
  { cliente: 'Ciclana', movimentacao: 41.00, data: "03/03/2022", tipo: "saida" },
  { cliente: 'Ciclana', movimentacao: 23.00, data: "08/03/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 300.00, data: "13/03/2022", tipo: "entrada" },
  { cliente: 'Beltrano', movimentacao: 10.10, data: "15/03/2022", tipo: "saida" },
  { cliente: 'Fulano', movimentacao: 30.90, data: "20/03/2022", tipo: "saida" },
];

const app = express();

function filtroDia(mov, diaFiltro){
  if (!diaFiltro){
    return true;
  }
  const movDia = mov.data.split("/")[0];
  return diaFiltro === movDia;
};

function filtroMes(mov, mesFiltro){
  if (!mesFiltro){
    return true;
  }
  const movMes = mov.data.split("/")[1];
  return mesFiltro === movMes;
};

function filtroTipo(mov, tipoFiltro){
  if (!tipoFiltro){
    return true;
  }
  const movTipo = mov.tipo;
  return tipoFiltro === mov.tipo;
};

app.get("/extrato", (req, res) => {
  const cliente = req.headers.user;
  if (!cliente){
    res.sendStatus(401);
    return;
  }
  
  const extratoCliente = extrato.filter(mov => { 
    return mov.cliente === cliente;
  });
  
  const { dia, mes, tipo } = req.query;
  let extratoFiltrado = extratoCliente
    .filter(mov => filtroDia(mov, dia))
    .filter(mov => filtroMes(mov, mes))
    .filter(mov => filtroTipo(mov, tipo));

  res.send(extratoFiltrado);
});


app.listen(5000);
