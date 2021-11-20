const Movie = require("./Movie");
const TV = require("./TV");
const Default = require("./default");
const Help = require("./help");
const Languages = require("./languages");

const Commands = [Help, Languages, Movie, TV];

Default.children = Commands;

module.exports = Default;
