const { createCanvas, registerFont, loadImage } = require("canvas");
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

const toImage = async (
  language,
  {
    itemId,
    itemBackdrop,
    itemTitle,
    itemDate,
    movieStar,
    itemGenres,
    itemOverview,
    itemPoster,
  }
) => {
  const canvas = {
    width: 1600,
    height: 700,
    padding: 50,
  };

  const myCanvas = createCanvas(canvas.width, canvas.height);
  registerFont("src/data/Montserrat.ttf", { family: "Montserrat" });
  registerFont("src/data/The-Sans-Plain-alinma.ttf", { family: "alinma" });
  const font = language === "ar" ? "Montserrat" : "alinma";

  const ctx = myCanvas.getContext("2d");
  ctx.imageSmoothingQuality = "high";
  ctx.imageSmoothingEnabled = true;
  ctx.globalCompositeOperation = "source-over";
  ctx.quality = "best";

  var background = {
    url: `https://image.tmdb.org/t/p/w1920_and_h800_multi_faces/${itemBackdrop}`,
    sx: 0,
    sy: 0,
    sWidth: 1920,
    sHeight: 800,
    dx: 320,
    dy: 0,
    dWidth: canvas.width,
    dHeight: canvas.height,
  };
  var poster = {
    url: `https://image.tmdb.org/t/p/w300_and_h450_bestv2/${itemPoster}`,
    width: 300,
    height: 450,
    sx: 0,
    sy: 0,
    sWidth: 300,
    sHeight: 450,
    dx: canvas.padding,
    dy: canvas.padding,
    dWidth: 160,
    dHeight: 240,
  };
  var title = {
    text: itemTitle,
    x: canvas.padding + poster.dWidth + 40,
    y: canvas.padding * 2 + 2,
    fontSize: 58,
    color: "white",
  };
  var subTitle = {
    text: `${itemDate},${itemId}`,
    x: title.x,
    y: title.y + canvas.padding - 2,
    fontSize: 28,
    color: "#9ac7fa",
  };
  var rate = {
    text: `${movieStar.toFixed(1)}/10`,
    x: subTitle.x + 5,
    y: subTitle.y + canvas.padding + 10,
    fontSize: 28,
    color: "white",
  };
  var genre = {
    text: itemGenres,
    x: rate.x + canvas.padding + 80,
    y: rate.y,
    fontSize: 28,
    color: "#9ac7fa",
  };
  var overview = {
    text: itemOverview,
    x: canvas.padding,
    y: poster.dHeight + canvas.padding * 2 + 10,
    fontSize: 28,
    color: "white",
  };
  async function draw({
    url,
    sx,
    sy,
    sWidth,
    sHeight,
    dx,
    dy,
    dWidth,
    dHeight,
  }) {
    const img = await loadImage(url);
    ctx.drawImage(img, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
  }

  function gradient() {
    var grd = ctx.createLinearGradient(0, 0, canvas.width, 0);
    grd.addColorStop(0.45, "rgba(0,0,0, 1)");
    grd.addColorStop(1, "rgba(0,0,0, 0.2)");
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  function text({ text, fontSize, color, x, y }) {
    ctx.font = `300 ${fontSize}px "${font}"`;
    ctx.fillStyle = color;
    ctx.fillText(text, x, y);
  }
  function wrapText(txt, x, y, maxWidth, lineHeight) {
    var words = txt.split(" ");
    var line = "";
    ctx.fillStyle = "white";
    ctx.font = `300 28px "${font}"`;

    for (var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + " ";
      var metrics = ctx.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, y);
  }

  function roundRect(x, y, w, h, r) {
    if (w < 2 * r) r = w / 2;
    if (h < 2 * r) r = h / 2;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = "white";
    ctx.stroke();
  }

  await draw(background);
  gradient();
  await draw(poster);
  text(title);
  text(subTitle);
  text(rate);
  roundRect(rate.x - 10, rate.y - 40, 100, 60, 5);
  text(genre);
  wrapText(overview.text, overview.x, overview.y, 800, 48);

  return myCanvas.toBuffer("image/jpeg");
};

module.exports = {
  random,
  imageURL,
  toImage,
};
