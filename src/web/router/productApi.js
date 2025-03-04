import productWebApi from "../../lib/Routing.js";
import ProductClass from "../controllers/ProductClass.js";

productWebApi.route("/products").get(ProductClass.allProducts);

// productWebApi.route("/product/quick-view/:id").get(ProductClass.singleProductQuickView);

productWebApi.route("/product/:id").get(ProductClass.singleProductView);

export default productWebApi;
