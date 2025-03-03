import dashboard from "../../lib/Routing.js";
import DashBoardAnalytics from "../controllers/dashboard.js";

dashboard.route("/dashborad").get((req, res) => {
  console.log("dashboard");
});

dashboard.route("/dashborad/total-top-card").get(DashBoardAnalytics.totalUesrOrderProductReview);

export default dashboard;
