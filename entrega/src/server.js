import server from "./Express/app.js";

const port = 8080;
server.listen(port, () => {
  console.log(`server on porta: ${port}`);
});
