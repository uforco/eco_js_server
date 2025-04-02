import AuthorizeJWT from "../../authorizeJWT/authorize_jwt.js";
import product_cart from "../../lib/Routing.js";
import Shoppingcart from "../controllers/shoppingcart.js";

// all protect route
product_cart.route("/allcardinfo/:userId").get(AuthorizeJWT.varifyAuthrizetion, Shoppingcart.getAllCartProductWithUser);
product_cart.route("/add-to-card").post(AuthorizeJWT.varifyAuthrizetion, Shoppingcart.addToCardProductWithUser);
product_cart.route("/add-to-card/:cartid").delete(AuthorizeJWT.varifyAuthrizetion, Shoppingcart.deleteSinglCart);

export default product_cart;