const fetch = require("node-fetch");
/**
 * Get random element from array.
 * @param {Array} array
 */
const random = (array) => array[Math.floor(Math.random() * array.length)];

/**
 * Get full Url of image.
 * @param {String} image
 */
const imageURL = (image) => `https://image.tmdb.org/t/p/w500${image}`;

const getBuffer = async (url) => {
  try {
    const response = await fetch(url);
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    return buffer;
  } catch (error) {
    return { error };
  }
};
module.exports = {
  random,
  imageURL,
  getBuffer,
};
