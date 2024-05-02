const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/api-usuarios");

const DadoUsuario = mongoose.model("DadoUsuario", {
  nome: String,
  idade: Number
});

app.get("/usuarios", async (req, res) => {
  const usuarios = await DadoUsuario.find();
  res.json(usuarios);
});

app.post('/usuarios', async (req, res) => {
    const { nome, idade } = req.body;
    const usuario = new DadoUsuario({ nome, idade });
    await usuario.save();
    res.json(usuario);
});

app.put('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, idade } = req.body;
    const usuario = await DadoUsuario.findByIdAndUpdate(id, { nome, idade }, { new: true });
    res.json(usuario);
});

app.delete('/usuarios/:id', async (req, res) => {
    const { id } = req.params;
    await DadoUsuario.findByIdAndDelete(id);
    res.sendStatus(204);
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
