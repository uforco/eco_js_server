import productWebApi from "../../lib/Routing.js";
import ProductClass from "../controllers/ProductClass.js";

productWebApi.route("/products").get(ProductClass.allProducts);

productWebApi.route("/product/:id").get(ProductClass.singleProductView);

productWebApi.route("/relatedproducts").get(ProductClass.relatedProducts);

export default productWebApi;
