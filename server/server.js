const jsonServer = require("json-server");
const auth = require("json-server-auth");
const fs = require("fs");

const server = jsonServer.create();
const router = jsonServer.router("db.json");

const middlewares = jsonServer.defaults();

const rules = auth.rewriter({
  users: 600,
  carts: 600,
  products: 440,
});

server.db = router.db;

server.use(middlewares);
server.use(rules);
server.use(auth);
server.use(router);

function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

const categories = [
  "Beverages",
  "Bread & Bakery",
  "Egg",
  "Frozen veg",
  "Fruit",
  "Homecare",
  "Pet Care",
  "Vegetables",
];

const locations = [
  "Tokyo, Japan",
  "Paris, France",
  "New York, USA",
  "London, UK",
  "Sydney, Australia",
  "Rio de Janeiro, Brazil",
  "Cape Town, South Africa",
  "Rome, Italy",
  "Bangkok, Thailand",
  "Toronto, Canada",
  "Berlin, Germany",
  "Dubai, UAE",
  "Barcelona, Spain",
  "Istanbul, Turkey",
  "Mumbai, India",
  "Seoul, South Korea",
  "Mexico City, Mexico",
  "Cairo, Egypt",
  "Helsinki, Finland",
  "Buenos Aires, Argentina",
];
function generateAdditionalProducts(startId, count) {
  const products = [];

  for (let i = startId; i < startId + count; i++) {
    const id = i.toString();
    const name = `Mock product ${id}`;
    const description = `Mock description of product ${id}`;
    const category = categories[Math.floor(Math.random() * categories.length)];
    const location = locations[Math.floor(Math.random() * locations.length)];
    const placeholderImage =
      "https://i.ibb.co/qYmCm8Xk/The-Secret-to-Making-Bakery-Quality-Bread-049202920.jpg";
    const price = parseFloat(getRandomNumber(10, 500).toFixed(2));
    const condition = "Organic";
    const originalPrice =
      parseFloat(getRandomNumber(10, 500).toFixed(2)) + price;
    const priceType = "Fixed";

    products.push({
      id,
      name,
      category,
      price,
      originalPrice,
      description,
      location,
      placeholderImage,
      condition,
      priceType,
    });
  }

  return products;
}

const existingData = JSON.parse(fs.readFileSync("db.json", "utf-8"));

const existingProducts = existingData.products;

const additionalProducts = generateAdditionalProducts(31, 970);
const allProducts = [...existingProducts, ...additionalProducts];

existingData.products = allProducts;

fs.writeFileSync("db.json", JSON.stringify(existingData, null, 2), "utf-8");

server.listen(process.env.PORT || 5000, () => {
  console.log("JSON Server is running");
});
