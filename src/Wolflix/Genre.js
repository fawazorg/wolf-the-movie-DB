class Genre {
  API;
  GENRE;
  LANGUAGE;
  TV_GENRES;
  MOVIE_GENRES;
  constructor(api, language) {
    this.API = api;
    this.LANGUAGE = language;
    this.GENRE = `${api.config.keyword}_genre`;
    this.TV_GENRES = `${api.config.keyword}_geners_tv`;
    this.MOVIE_GENRES = `${api.config.keyword}_genres_movie`;
  }
  PrintTV = (gids = []) => this._printGenres("tv", gids);
  PrintMovie = (gids = []) => this._printGenres("movie", gids);
  ByNameTV = (name) => this._getIdByName("tv", name);
  ByNameMovie = (name) => this._getIdByName("movie", name);
  _formatGenre = ({ name, emoji }) => {
    const phrase = this._getPhrase(this.GENRE);
    return this.API.utility().string().replace(phrase, { name, emoji });
  };
  _formatGenres = (genres) => {
    let reponse = "";
    genres.forEach((g, index, array) => {
      if (index === array.length - 1) {
        reponse += this._formatGenre(g);
        return reponse;
      }
      reponse += `${this._formatGenre(g)}\n`;
    });
    return reponse;
  };
  _get_genres = (type) => {
    const genres =
      type === "tv"
        ? this._getPhrase(this.TV_GENRES)
        : this._getPhrase(this.MOVIE_GENRES);
    return genres;
  };
  _getIdByName = (type, name) => {
    let id;
    this._get_genres(type).forEach((t) => {
      if (t.name.toLowerCase() === name.toLowerCase()) {
        id = t.id;
      }
    });
    return `${id}`;
  };
  _getGenresByids = (type, ids) => {
    return this._get_genres(type).filter((t) => ids.includes(t.id));
  };
  _printGenres = (type, gids = []) => {
    if (gids.length === 0) {
      return this._formatGenres(this._get_genres(type));
    }
    return this._formatGenres(this._getGenresByids(type, gids));
  };
  _getPhrase = (phrase) => {
    return this.API.phrase().getByLanguageAndName(this.LANGUAGE, phrase);
  };
}

module.exports = Genre;
