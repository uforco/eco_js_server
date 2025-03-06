import orderapi from "../../lib/Routing.js";
import OrderProductClass from "../controllers/OrderProduct.js";

orderapi.route("/order").post(OrderProductClass.createOrderProduct);


export default orderapi;