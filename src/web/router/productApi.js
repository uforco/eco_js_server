import AuthorizeJWT from "../../authorizeJWT/authorize_jwt.js";
import productWebApi from "../../lib/Routing.js";
import ProductClass from "../controllers/ProductClass.js";

productWebApi.route("/search_product/:title").get(ProductClass.likesearchfiletr);
productWebApi.route("/submit-search/:title").get(ProductClass.submitSearchfiletr);
productWebApi.route("/products").get(ProductClass.allProducts);
productWebApi.route("/product/:id").get(ProductClass.singleProductView);
productWebApi.route("/featured-products").get(ProductClass.featuredProducts);
productWebApi.route("/bestrateddealproduct").get(ProductClass.hotBestRatedProduct);
productWebApi.route("/relatedproducts").get(ProductClass.relatedProducts);
productWebApi.route("/categoriefillter").get(ProductClass.fillter);

// protect url user withlist by products
productWebApi.route("/wishlist").get(AuthorizeJWT.varifyAuthrizetion, ProductClass.wishlist);

export default productWebApi;
