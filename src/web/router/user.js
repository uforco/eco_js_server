import userDetails from "../../lib/Routing.js";
import PtoductDetailsByUser from "../controllers/PtoductDetailsByUser.js";

userDetails.route("/add-to-card").post(PtoductDetailsByUser.addToCardProductWithUser);


export default userDetails;
