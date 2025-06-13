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
  const placeholderImage = "https://i.ibb.co/hJ1BGC1K/placeholder-image.jpg";

  const products = [];

  for (let i = startId; i < startId + count; i++) {
    const id = i.toString();
    const name = `Mock product ${id}`;
    const description = `Mock description of product ${id}`;
    const category = categories[Math.floor(Math.random() * categories.length)];
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

const existingProducts = existingData.products || [];

const additionalProducts = generateAdditionalProducts(26, 975);

const allProducts = [...existingProducts, ...additionalProducts];

existingData.products = allProducts;

fs.writeFileSync("db.json", JSON.stringify(existingData, null, 2), "utf-8");

console.log("✅ Updated db.json with 1000 products.");
