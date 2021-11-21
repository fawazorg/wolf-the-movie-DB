const Genre = require("./Genre");
const { imageURL, HtmlToImage } = require("../utility/index");
const dark = require("../utility/templates/dark.temple");
const groups = require("../data/groups");
class Base {
  #API;
  #Command;
  #Type;
  Language;
  Genre;
  #Wolflix_Item;
  #Wolflix_List_Popular_Movie;
  #Wolflix_List_Popular_Tv;
  #Wolflix_List_Upcomming;
  #Wolflix_List_Today;
  #Wolflix_Error_Notfound;

  /**
   *
   * @param {import("@dawalters1/wolf.js").WOLFBot} api
   * @param {import("@dawalters1/wolf.js").CommandObject} command
   * @param {("tv"|"movie")} type
   */
  constructor(api, command, type) {
    this.#API = api;
    this.#Command = command;
    this.#Type = type;
    this.Genre = new Genre(api, command.language);
    this.Language = command.language;
    this._setup(api.config.keyword);
  }

  /**
   *
   * @param {String} keyword
   */
  _setup = (keyword) => {
    this.#Wolflix_Item = `${keyword}_item`;
    this.#Wolflix_List_Popular_Movie = `${keyword}_list_popular_movie`;
    this.#Wolflix_List_Popular_Tv = `${keyword}_list_popular_tv`;
    this.#Wolflix_List_Upcomming = `${keyword}_list_upcomming_movie`;
    this.#Wolflix_List_Today = `${keyword}_list_today_tv`;
    this.#Wolflix_Error_Notfound = `${keyword}_error_not_found`;
  };

  /**
   *
   * @param {*} item
   */
  _replyItem = async (item) => {
    if (groups.Find(this.#Command.targetGroupId)) {
      return await this._reply(await HtmlToImage(this._formatItmeHtml(item)));
    }
    await this._replyItemImage(item);
    await this._reply(this._formatItem(item));
  };

  /**
   *
   * @param {*} items
   * @param {("upcomming"|"today"|"popular")} type
   */
  _replyItems = async (items, type) => {
    if (type === "upcomming") {
      await this._reply(this._formatUpcommingList(items));
      return;
    }
    if (type === "today") {
      await this._reply(this._formatTodayList(items));
      return;
    }
    await this._reply(this._formatPopularList(items));
  };

  /**
   *
   * @param {*} item
   */
  _getItemImage = async (item) => {
    return await this.#API
      .utility()
      .download()
      .file(imageURL(item.poster_path));
  };

  /**
   *
   * @param {*} item
   */
  _replyItemImage = async (item) => {
    await this._reply(await this._getItemImage(item));
  };

  /**
   *
   */
  _replyGenres = async () => {
    const genres =
      this.#Type === "tv" ? this.Genre.PrintTV() : this.Genre.PrintMovie();
    await this._reply(genres);
  };
  /**
   *
   * @param {*} error
   */
  _replyError = async (error) => {
    console.log(error);
    await this._reply(this._getPhrase(this.#Wolflix_Error_Notfound));
  };

  /**
   *
   * @param {String} content
   */
  _reply = async (content) => {
    await this.#API.messaging().sendMessage(this.#Command, content);
  };

  /**
   *
   * @param {String} phrase
   * @returns {String}
   */
  _getPhrase = (phrase) => {
    return this.#API.phrase().getByLanguageAndName(this.Language, phrase);
  };

  /**
   *
   * @param {*} item
   */
  _getItemImage = async (item) => {
    return await this.#API
      .utility()
      .download()
      .file(imageURL(item.poster_path));
  };

  /**
   *
   * @param {Array} itmes
   * @returns {String}
   */
  _formatUpcommingList = (itmes) => {
    return this._formatItemsList(itmes, this.#Wolflix_List_Upcomming);
  };

  /**
   *
   * @param {Array} itmes
   * @returns {String}
   */
  _formatTodayList = (itmes) => {
    return this._formatItemsList(itmes, this.#Wolflix_List_Today);
  };

  /**
   *
   * @param {Array} itmes
   * @returns
   */
  _formatPopularList = (itmes) => {
    if (this.#Type === "tv") {
      return this._formatItemsList(itmes, this.#Wolflix_List_Popular_Tv);
    }
    return this._formatItemsList(itmes, this.#Wolflix_List_Popular_Movie);
  };

  /**
   *
   * @param {Array} items
   * @param {String} phrase
   */
  _formatItemsList = (items, phrase) => {
    return this.#API
      .utility()
      .string()
      .replace(this._getPhrase(phrase), { list: this._formatList(items) });
  };

  /**
   *
   * @param {*} item
   */
  _formatItem = (item) => {
    //TODO: check if overview or genres is Empty and display message to help TMDB
    return this.#API
      .utility()
      .string()
      .replace(this._getPhrase(this.#Wolflix_Item), {
        emoji: this.#Type === "tv" ? "📺" : "🎬",
        id: item.id,
        title: this._itemName(item),
        overview: item.overview,
        stars: item.vote_average,
        genres: this._itemGenres(item),
        date: this._itemDate(item),
      });
  };

  /**
   *
   * @param {*} item
   */
  _formatItmeHtml = (item) => {
    return this.#API
      .utility()
      .string()
      .replace(dark, {
        itemid: item.id,
        itemBackdrop: item.backdrop_path ?? "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
        itemTitle: this._itemName(item) ?? "",
        itmeDate: this._itemDate(item) ?? "",
        movieStar: item.vote_average ?? 0,
        itemGenres: this._itemGenres(item, true) ?? "",
        itemOverview: item.overview ?? "",
        itemPoster: item.poster_path ?? "/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
      });
  };

  /**
   *
   * @param {*} item
   * @returns
   */
  _itemName = (item) => {
    return this.#Type === "tv" ? item.name : item.title;
  };

  /**
   *
   * @param {*} item
   * @returns
   */
  _itemGenres = (item, html) => {
    const ids = item.hasOwnProperty("genre_ids") ? item.genre_ids : item.genres;
    if (ids.length > 0) {
      return this.#Type === "tv"
        ? this.Genre.PrintTV(ids, html)
        : this.Genre.PrintMovie(ids, html);
    }
    return "";
  };

  /**
   *
   * @param {*} item
   * @returns
   */
  _itemOriginalName = (item) => {
    return this.#Type === "tv" ? item.original_name : item.original_title;
  };

  /**
   *
   * @param {*} item
   * @returns {String}
   */
  _itemDate = (item) => {
    return this.#Type === "tv"
      ? item.first_air_date.split("-")[0]
      : item.release_date.split("-")[0];
  };

  /**
   *
   * @param {*} items
   * @param {Number} length
   * @returns {String}
   */
  _formatList = (items, length = 10) => {
    let results = "\n";
    items.slice(0, length).forEach((item, index, array) => {
      if (index === array.length - 1) {
        results += `${index + 1}. ${this._itemOriginalName(item)} (${item.id})`;
        return results;
      }
      results += `${index + 1}. ${this._itemOriginalName(item)} (${item.id})\n`;
    });
    return results;
  };
}

module.exports = Base;
