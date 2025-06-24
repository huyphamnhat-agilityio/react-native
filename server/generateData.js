const fs = require("fs");

// --- Utils ---
function getRandomHexColor() {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16);
  return `#${hex.padStart(6, "0")}`;
}

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

function generateAdditionalProducts(startId, count) {
  const categories = ["chair", "table", "armchair", "bed", "lamp"];
  const placeholderImages = [
    "https://m.media-amazon.com/images/I/711I3okfOpL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61tKBisT-fL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81TkJswJG0L._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/91rstt0EjJL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61M0XLr7leL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/51vsLXXdogL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71LWhgxJCaL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/91dOElUKYkL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71rUHEn-sDL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81wxsyggYnL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71MddU5MM6L._AC_SL1024_.jpg",
    "https://m.media-amazon.com/images/I/71FOaSg3vML._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/516Pw+oFelL._AC_.jpg",
    "https://m.media-amazon.com/images/I/61XPAy+52+L._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/51SdBekg4vL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81bSNmm-XUL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/71X8X1T44RL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81JJfFGNgqL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/61SSdt8x+XL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/811sKBEFYxL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/910weRS40sL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/81B3z8MoqfL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/91h0xn+XfcL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/510aZ29xudL._AC_SL1500_.jpg",
    "https://m.media-amazon.com/images/I/817l+VzWGWL._AC_SL1500_.jpg",
  ];

  const products = [];

  for (let i = startId; i < startId + count; i++) {
    const id = i.toString();
    const name = `Mock product ${id}`;
    const description = `Mock description of product ${id}`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const placeholderImage =
      placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
    const price = parseFloat(getRandomNumber(10, 500).toFixed(2));
    const stock = Math.floor(getRandomNumber(10, 1000));
    const rating = parseFloat(getRandomNumber(3.0, 5.0).toFixed(1));
    const reviewCount = Math.floor(getRandomNumber(1, 1000));

    const variants = Array.from({ length: 3 }, () => ({
      color: getRandomHexColor(),
      image: placeholderImage,
    }));

    products.push({
      id,
      name,
      category,
      price,
      stock,
      rating,
      reviewCount,
      description,
      variants,
    });
  }

  return products;
}

const existingData = JSON.parse(fs.readFileSync("db.json", "utf-8"));

const existingProducts = existingData.products.slice(0, 25) || [];

const additionalProducts = generateAdditionalProducts(26, 975);

const allProducts = [...existingProducts, ...additionalProducts];

existingData.products = allProducts;

fs.writeFileSync("db.json", JSON.stringify(existingData, null, 2), "utf-8");

console.log("✅ Updated db.json with 1000 products.");
