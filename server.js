const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // middleware
app.use(express.json());

let PARTIDAS = [
    {
        id: 1,
        jogo: "Team Fortress 2",
        timeA: "Builders League United",
        timeB: "Reliable Excavation Demolition",
        pontoA: 3,
        pontoB: 2,
        status: "finalizada"
    },
    {
        id: 2,
        jogo: "Corrida Turbo",
        timeA: "Lobos",
        timeB: "Falcões",
        pontoA: 0,
        pontoB: 0,
        status: "agendada"
    },
]

app.get("/", (req, res) => {
    res.status(200).json({ mensagem: "Campeonato Gamer no ar!" })
});

app.get("/partidas", (req, res) => {
    res.status(200).json(PARTIDAS);
});

app.get("/partidas/:id", (req, res) => {
    const id = Number(req.params.id);
    const partida = PARTIDAS.find(p => p.id === id);

    if (!partida) {
        return res.status(404).json({ mensagem: "Partida não encontrada" })
    }

    res.status(200).json(partida);
});

app.post("/partidas", (req, res) => {

    const { jogo, timeA, timeB } = req.body;
    if (!jogo || !timeA || !timeB) {
        return res.status(400).json({
            mensagem: "Informe jogo, timeA e B"
        });
    }

    if (timeA.trim().toLowerCase() === timeB.trim().toLowerCase()) {
        return res.status(400).json({
            mensagem: "Os times devem ser diferentes."
        });
    }

    // const novoId = PARTIDAS.length > 0
    //     ? Math.max(...PARTIDAS.map(p => p.id)) + 1 : 1;
        const novoId = PARTIDAS.length > 0
        ? PARTIDAS[PARTIDAS.length - 1].id +1 : 1;

    const novaPartida = {
        id: novoId,
        jogo: jogo.trim(),
        timeA: timeA.trim(),
        timeB: timeB.trim(),
        pontoA: 0,
        pontoB: 0,
        status: "agendada",
    }

    PARTIDAS.push(novaPartida);
    res.status(201).json({
        mensagem: "Partida cadastrada!",
        partida: novaPartida
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});