class Genre {
  API;
  LANGUAGE;
  Comma;
  Genre_Available;
  TV_GENRES;
  MOVIE_GENRES;

  /**
   *
   * @param {import("@dawalters1/wolf.js").WOLFBot} api
   * @param {String} language
   */
  constructor(api, language) {
    this.API = api;
    this.LANGUAGE = language;
    this.Comma = `${api.config.keyword}_comma`;
    this.Genre_Available = `${api.config.keyword}_genre_available`;
    this.TV_GENRES = `${api.config.keyword}_genres_tv`;
    this.MOVIE_GENRES = `${api.config.keyword}_genres_movie`;
  }

  /**
   *
   * @param {Array} gids
   * @returns {String}
   */
  PrintTV = (gids = []) => this._printGenres("tv", gids);

  /**
   *
   * @param {Array} gids
   * @returns {String}
   */
  PrintMovie = (gids = []) => this._printGenres("movie", gids);

  /**
   *
   * @param {Sting} name
   * @returns {String}
   */
  ByNameTV = (name) => this._getIdByName("tv", name);

  /**
   *
   * @param {String} name
   * @returns {String}
   */
  ByNameMovie = (name) => this._getIdByName("movie", name);

  /**
   *
   * @param {Array} genres
   * @returns {String}
   */
  _formatGenres = (genres) => {
    let reponse = "";
    genres.forEach((g, index, array) => {
      if (index === array.length - 1) {
        reponse += `-${g.emoji} ${g.name}`;
        return reponse;
      }
      reponse += `-${g.emoji} ${g.name}\n`;
    });
    return reponse;
  };

  /**
   *
   * @param {Array} genres
   * @returns {String}
   */
  _formatAllGenres = (genres) => {
    let reponse = this._getPhrase(this.Genre_Available);
    const comma = this._getPhrase(this.Comma);
    genres.forEach((g, index, array) => {
      if (index === array.length - 1) {
        reponse += `${g.name}.`;
        return reponse;
      }
      reponse += `${g.name} ${comma} `;
    });
    return reponse;
  };

  /**
   *
   * @param {("tv"|"movie")} type
   * @returns {Array} genres
   */
  _get_genres = (type) => {
    const genres =
      type === "tv"
        ? this._getPhrase(this.TV_GENRES)
        : this._getPhrase(this.MOVIE_GENRES);
    return genres;
  };

  /**
   *
   * @param {("tv"|"movie")} type
   * @param {String} name
   * @returns {String}
   */
  _getIdByName = (type, name) => {
    let id;
    this._get_genres(type).forEach((t) => {
      if (t.name.toLowerCase() === name.toLowerCase()) {
        id = t.id;
      }
    });
    return `${id}`;
  };

  /**
   *
   * @param {("tv"|"movie")} type
   * @param {Array} ids
   * @returns {Array}
   */
  _getGenresByids = (type, ids) => {
    return this._get_genres(type).filter((t) => ids.includes(t.id));
  };

  /**
   *
   * @param {("tv"|"movie")} type
   * @param {Array} gids
   * @returns
   */
  _printGenres = (type, gids = []) => {
    if (gids.length === 0) {
      return this._formatAllGenres(this._get_genres(type));
    }
    if (Number.isFinite(gids[0])) {
      return this._formatGenres(this._getGenresByids(type, gids));
    }
    let ids = [];
    gids.forEach((t) => ids.push(t.id));
    return this._formatGenres(this._getGenresByids(type, ids));
  };

  /**
   *
   * @param {String} phrase
   * @returns {Array}
   */
  _getPhrase = (phrase) => {
    return this.API.phrase().getByLanguageAndName(this.LANGUAGE, phrase);
  };
}

module.exports = Genre;
