const { v3 } = require("@leonardocabeza/the-movie-db");
require("dotenv").config();

const ApiKey = process.env.TMDB_API_Key;
const Client = v3(ApiKey);

module.exports = Client;
