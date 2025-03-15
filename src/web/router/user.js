import userDetails from "../../lib/Routing.js";
import PtoductDetailsByUser from "../controllers/PtoductDetailsByUser.js";
import Shoppingcart from "../controllers/shoppingcart.js";

userDetails.route("/allcardinfo/:userId").get(Shoppingcart.getAllCartProductWithUser);

userDetails.route("/add-to-card").post(Shoppingcart.addToCardProductWithUser);

userDetails.route("/add-to-card/:cartid").delete(Shoppingcart.deleteSinglCart);




userDetails.route("/singup").post(PtoductDetailsByUser.singupUser);

userDetails.route("/singuponly").post(PtoductDetailsByUser.singuponly);


userDetails.route("/login").post(PtoductDetailsByUser.getLogin);


userDetails.route("/getusers").get(PtoductDetailsByUser.getUsersDetails);







export default userDetails;
