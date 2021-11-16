const fetch = require("node-fetch");
const Genre = require("./Genre");
const TMDB = require("./TMDB");
const { random, imageURL, getBuffer, printGenres } = require("../utility");

class Movie {
  API;
  GENRE;
  COMMAND;
  LANGUAGE;
  MOVIE_PHRASE;
  MOVIE_LIST_POPULAR;
  MOVIE_LIST_UPCOMMING;
  MOVIE_ERROR_NOT_FOUND_ID;
  MOVIE_ERROR_NOT_FOUND_QUERY;
  constructor(api, command) {
    this.API = api;
    this.GENRE = new Genre(api, command.language);
    this.COMMAND = command;
    this.LANGUAGE = command.language;
    this.MOVIE_PHRASE = `${api.config.keyword}_movie_message`;
    this.MOVIE_GENRES = `${api.config.keyword}_movie_genres`;
    this.MOVIE_LIST_POPULAR = `${api.config.keyword}_movie_list_popular_message`;
    this.MOVIE_LIST_UPCOMMING = `${api.config.keyword}_movie_list_upcomming_message`;
    this.MOVIE_ERROR_NOT_FOUND_ID = `${api.config.keyword}_movie_error_not_found_id_message`;
    this.MOVIE_ERROR_NOT_FOUND_QUERY = `${api.config.keyword}_movie_error_not_found_query_message`;
  }
  Random = async () => {
    try {
      const movies = await TMDB.discover.movie({
        language: this.LANGUAGE,
        sort_by: this._randomSortBy(),
        page: Math.floor(Math.random() * 10 + 1),
      });
      await this._replyMovie(random(movies.results));
    } catch (error) {
      this._reply(this._getPhrase(this.MOVIE_ERROR_NOT_FOUND_ID));
    }
  };

  Find = async (id) => {
    try {
      const movie = await TMDB.movie.details(id, { language: this.LANGUAGE });
      if (movie) {
        this._replyMovie(movie);
      }
    } catch (error) {
      this._reply(this._getPhrase(this.MOVIE_ERROR_NOT_FOUND_ID));
    }
  };
  Search = async (query) => {
    try {
      const movies = await TMDB.search.movies({
        language: this.LANGUAGE,
        query,
      });
      if (movies.results.length > 0) {
        this._replyMovie(movies.results[0]);
        return;
      }
      this._reply(this._getPhrase(this.MOVIE_ERROR_NOT_FOUND_QUERY));
    } catch (error) {
      this._reply(this._getPhrase(this.MOVIE_ERROR_NOT_FOUND_QUERY));
    }
  };
  Upcomming = async () => {
    try {
      const movies = await TMDB.movie.upcoming({ language: this.LANGUAGE });
      await this._replyMovies(movies.results, this.MOVIE_LIST_UPCOMMING);
    } catch (error) {}
  };
  Genre = async (name) => {
    try {
      const movies = await TMDB.discover.movie({
        language: this.LANGUAGE,
        sort_by: this._randomSortBy(),
        page: Math.floor(Math.random() * 10 + 1),
        with_genres: this.GENRE.ByNameMovie(name),
      });
      if (movies.results.length > 0) {
        await this._replyMovie(random(movies.results));
        return;
      }
      this._reply(this._getPhrase(this.MOVIE_ERROR_NOT_FOUND_ID));
    } catch (error) {
      this._reply(this._getPhrase(this.MOVIE_ERROR_NOT_FOUND_ID));
    }
  };
  Genres = async (name) => {
    await this._reply(this.GENRE.PrintMovie());
  };
  Popular = async () => {
    try {
      const movies = await TMDB.movie.popular({ language: this.LANGUAGE });
      await this._replyMovies(movies.results, this.MOVIE_LIST_POPULAR);
    } catch (error) {}
  };
  _randomSortBy = () => {
    const SortBy = [
      "popularity.desc",
      "revenue.desc",
      "vote_average.desc",
      "vote_count.desc",
    ];
    return random(SortBy);
  };
  _getMovieImage = async (movie) => {
    return await getBuffer(imageURL(movie.poster_path));
  };
  _formatMovie = ({
    id,
    release_date,
    vote_average,
    genre_ids,
    original_title,
    overview,
  }) => {
    return this.API.utility()
      .string()
      .replace(this._getPhrase(this.MOVIE_PHRASE), {
        id,
        original_title,
        overview,
        vote_average,
        genres: this.GENRE.PrintMovie(genre_ids),
        release_date: release_date.split("-")[0],
      });
  };
  _formatMovieList = (movies, phrase) => {
    return this.API.utility()
      .string()
      .replace(this._getPhrase(phrase), { list: this._formatList(movies) });
  };
  _formatList = (movies, length = 10) => {
    let results = "\n";
    movies.slice(0, length).forEach((movie, index, array) => {
      if (index === array.length - 1) {
        results += `${index + 1}. ${movie.original_title} (${movie.id})`;
        return results;
      }
      results += `${index + 1}. ${movie.original_title} (${movie.id})\n`;
    });
    return results;
  };
  _replyMovie = async (movie) => {
    await this._reply(await this._getMovieImage(movie));
    await this._reply(this._formatMovie(movie));
  };
  _replyMovies = async (movies, phrase) => {
    await this._reply(this._formatMovieList(movies, phrase));
  };
  _reply = async (content) => {
    await this.API.messaging().sendMessage(this.COMMAND, content);
  };
  _getPhrase = (phrase) => {
    return this.API.phrase().getByLanguageAndName(this.LANGUAGE, phrase);
  };
}

module.exports = Movie;
