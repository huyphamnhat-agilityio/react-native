const jsonServer = require("json-server");
const auth = require("json-server-auth");

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

server.listen(process.env.PORT || 5000, () => {
  console.log("JSON Server is running");
});
