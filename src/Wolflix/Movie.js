const TMDB = require("./TMDB");
const Base = require("./Base");
const { random } = require("../utility");

class Movie extends Base {
  /**
   *
   * @param {import("@dawalters1/wolf.js").WOLFBot} api
   * @param {import("@dawalters1/wolf.js").CommandObject} command
   */
  constructor(api, command) {
    super(api, command, "movie");
  }

  /**
   *
   *
   */
  Random = async () => {
    try {
      const movies = await TMDB.discover.movie({
        language: this.Language,
        sort_by: this._randomSortBy(),
        page: Math.floor(Math.random() * 10 + 1),
      });
      await this._replyItem(random(movies.results));
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   * @param {Number} id
   */
  Find = async (id) => {
    try {
      const movie = await TMDB.movie.details(id, { language: this.Language });
      if (movie) {
        await this._replyItem(movie);
      }
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   * @param {String} query
   * @returns
   */
  Search = async (query) => {
    try {
      const movies = await TMDB.search.movies({
        language: this.Language,
        query,
      });
      if (movies.results.length > 0) {
        await this._replyItem(movies.results[0]);
        return;
      }
      await this._replyError("Not Found!");
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   *
   */
  Upcomming = async () => {
    try {
      const movies = await TMDB.movie.upcoming({ language: this.Language });
      await this._replyItems(movies.results, "upcomming");
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   * @param {String} name
   * @returns
   */
  ByGenre = async (name) => {
    try {
      const movies = await TMDB.discover.movie({
        language: this.Language,
        sort_by: this._randomSortBy(),
        page: Math.floor(Math.random() * 10 + 1),
        with_genres: this.Genre.ByNameMovie(name),
      });
      if (movies.results.length > 0) {
        await this._replyItem(random(movies.results));
        return;
      }
      await this._replyError("Not Found!");
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   * @param {String} name
   */
  Genres = async (name) => {
    await this._replyGenres();
  };

  /**
   *
   *
   */
  Popular = async () => {
    try {
      const movies = await TMDB.movie.popular({ language: this.Language });
      await this._replyItems(movies.results, "popular");
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   * @returns {Array}
   */
  _randomSortBy = () => {
    const SortBy = [
      "popularity.desc",
      "revenue.desc",
      "vote_average.desc",
      "vote_count.desc",
    ];
    return random(SortBy);
  };
}

module.exports = Movie;
