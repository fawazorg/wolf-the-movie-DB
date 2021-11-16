const Movie = require("./Movie");
const Default = require("./default");
const Help = require("./help");
const Languages = require("./languages");

const Commands = [Help, Languages, Movie];

Default.children = Commands;

module.exports = Default;
