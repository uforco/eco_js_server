import userDetails from "../../lib/Routing.js";
import UserSystem from "../controllers/UserSystem.js";
import Shoppingcart from "../controllers/shoppingcart.js";

userDetails.route("/allcardinfo/:userId").get(Shoppingcart.getAllCartProductWithUser);

userDetails.route("/add-to-card").post(Shoppingcart.addToCardProductWithUser);

userDetails.route("/add-to-card/:cartid").delete(Shoppingcart.deleteSinglCart);





// user upser api system

userDetails.route("/oauth_check").post(UserSystem.oauthChecking);


userDetails.route("/singup").post(UserSystem.singupUser);

userDetails.route("/login").post(UserSystem.getLogin);

userDetails.route("/getusers").get(UserSystem.getUsersDetails);







export default userDetails;
