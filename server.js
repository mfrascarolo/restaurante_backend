const express = require ("express");
const path = require ("path");
const cors = require ("cors");
require("dotenv").config();
const { log } = require("console");
const { dbConnection } = require("./bbddConection");

const PORT = 3012;

const server = express();
server.use(cors());//Para evitar problemas de seguridad
server.use(express.json()); //Para recibir y enviar JSON
dbConnection();

server.use("/menus", require("./routes/menus"));
server.use("/pedidos", require("./routes/pedidos"));

server.listen(PORT, () => {
    console.log("Server iniciado en: ", PORT);
});