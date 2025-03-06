import userDetails from "../../lib/Routing.js";
import PtoductDetailsByUser from "../controllers/PtoductDetailsByUser.js";

userDetails.route("/allcardinfo/:userId").get(PtoductDetailsByUser.getAllCartProductWithUser);
userDetails.route("/add-to-card").post(PtoductDetailsByUser.addToCardProductWithUser);

userDetails.route("/singup").post(PtoductDetailsByUser.singupUser);


export default userDetails;
