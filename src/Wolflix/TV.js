const TMDB = require("./TMDB");
const Base = require("./Base");
const { random } = require("../utility");

class TV extends Base {
  /**
   *
   * @param {import("@dawalters1/wolf.js").WOLFBot} api
   * @param {import("@dawalters1/wolf.js").CommandObject} command
   */
  constructor(api, command) {
    super(api, command, "tv");
  }

  /**
   *
   *
   */
  Random = async () => {
    try {
      const tvShows = await TMDB.discover.tvShows({
        language: this.Language,
        sort_by: this._randomSortBy(),
        page: Math.floor(Math.random() * 10 + 1),
      });
      await this._replyItem(random(tvShows.results));
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
      const tvShow = await TMDB.tv.details(id, { language: this.Language });
      if (tvShow) {
        await this._replyItem(tvShow);
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
      const tvShows = await TMDB.search.tv({
        language: this.Language,
        query,
      });
      if (tvShows.results.length > 0) {
        const tvShow = await TMDB.tv.details(tvShows.results[0].id, {
          language: this.Language,
        });

        await this._replyItem(tvShow);
        return;
      }
      await this._replyError("not Found!");
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   *
   */
  Today = async () => {
    try {
      const tvShows = await TMDB.tv.airingToday({ language: this.Language });
      await this._replyItems(tvShows.results, "today");
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
      const tvShows = await TMDB.discover.tvShows({
        language: this.Language,
        sort_by: this._randomSortBy(),
        page: Math.floor(Math.random() * 10 + 1),
        with_genres: this.Genre.ByNameTV(name),
      });
      if (tvShows.results.length > 0) {
        await this._replyItem(random(tvShows.results));
        return;
      }
      await this._replyError("not found!");
    } catch (error) {
      await this._replyError(error);
    }
  };

  /**
   *
   *
   */
  Genres = async () => {
    await this._replyGenres();
  };

  /**
   *
   *
   */
  Popular = async () => {
    try {
      const tvShows = await TMDB.tv.popular({ language: this.Language });
      await this._replyItems(tvShows.results, "popular");
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
      "vote_average.desc",
      "first_air_date.desc",
    ];
    return random(SortBy);
  };
}

module.exports = TV;
