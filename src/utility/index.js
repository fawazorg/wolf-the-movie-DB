const puppeteer = require("puppeteer");
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

const HtmlToImage = async (html) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(html);

  const content = await page.$("body");
  const imageBuffer = await content.screenshot({ type: "jpeg" });

  await page.close();
  await browser.close();

  return imageBuffer;
};

module.exports = {
  random,
  imageURL,
  HtmlToImage,
};
