import userDetails from "../../lib/Routing.js";
import UserSystem from "../controllers/UserSystem.js";


// Open url with users 

// user upser api system
// userDetails.route("/oauth_check").post(UserSystem.oauthChecking);
// userDetails.route("/singup").post(UserSystem.singupUser);
// userDetails.route("/signin").post(UserSystem.loginprovider);


// forget passward
// userDetails.route("/forget_passwoard/create-link").post(UserSystem.forgetPasswoard);
// userDetails.route("/forget_passwoard/check-url/:token").get(UserSystem.forgetPasswoard_check_token);
// userDetails.route("/forget_passwoard/submit_passward/:token").post(UserSystem.forget_submit_password);



export default userDetails;
