import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());

let tempo = 0;
let idIntervalo;

app.post("/iniciar", (request,response) =>{
    idIntervalo = setInterval(() => tempo++, 1000);
    response.send("Cronômetro iniciado");
});

app.post("/parar", (request,response) => {
    clearInterval(idIntervalo);
    let tempoFinal = { "tempo": tempo };
    response.send(tempoFinal);
    tempo = 0;
});

app.listen(5000, () => {
    console.log("Server is running.");
});