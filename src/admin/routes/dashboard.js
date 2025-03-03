import routing from "../../lib/Routing.js";

routing.route("/dashborad").get((req, res) => {
  console.log("dashboard");
});

export default routing;
