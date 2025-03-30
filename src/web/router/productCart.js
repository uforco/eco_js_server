import product_cart from "../../lib/Routing.js";
import Shoppingcart from "../controllers/shoppingcart.js";


product_cart.route("/allcardinfo/:userId").get(Shoppingcart.getAllCartProductWithUser);

product_cart.route("/add-to-card").post(Shoppingcart.addToCardProductWithUser);

product_cart.route("/add-to-card/:cartid").delete(Shoppingcart.deleteSinglCart);


export default product_cart;