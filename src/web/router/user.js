import userDetails from "../../lib/Routing.js";
import UserSystem from "../controllers/UserSystem.js";


// user upser api system

userDetails.route("/oauth_check").post(UserSystem.oauthChecking);

userDetails.route("/singup").post(UserSystem.singupUser);

userDetails.route("/signin").post(UserSystem.loginprovider);




export default userDetails;
