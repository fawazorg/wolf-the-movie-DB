const Default = require("./default");
const Find = require("./find");
const Genre = require("./genre");
const Genres = require("./genres");
const Help = require("./help");
const Popular = require("./popular");
const Search = require("./search");
const Upcomming = require("./upcoming");

const Commands = [Find, Genre, Genres, Help, Popular, Search, Upcomming];
Default.children = Commands;
module.exports = Default;
