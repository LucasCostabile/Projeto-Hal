import server from "./Express/app.js";
import { createProduct } from "./services/product.service.js";
const port = 8080;
server.listen(port, () => {
  console.log(`server on porta: ${port}`);
});
