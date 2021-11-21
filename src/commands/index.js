const Movie = require("./Movie");
const TV = require("./TV");
const Default = require("./default");
const Help = require("./help");
const Languages = require("./languages");
const Stats = require("./stats");
const Switch = require("./switch");

const Commands = [Help, Languages, Movie, TV, Stats, Switch];

Default.children = Commands;

module.exports = Default;
