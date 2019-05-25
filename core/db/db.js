const mongoose = require("mongoose");
const env = require("../config/.env.js");

const options = { useNewUrlParser: true };
const abrirConexao = () => mongoose.connect(env.mongoDbConnection, options);

module.exports = { abrirConexao };
