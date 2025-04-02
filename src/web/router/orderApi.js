import AuthorizeJWT from "../../authorizeJWT/authorize_jwt.js";
import orderapi from "../../lib/Routing.js";
import OrderProductClass from "../controllers/OrderProduct.js";

// All protect route user order show-order-list create etc
orderapi.route("/order").post(AuthorizeJWT.varifyAuthrizetion, OrderProductClass.createOrderProduct);
orderapi.route("/orders_history/:userid").get(AuthorizeJWT.varifyAuthrizetion, OrderProductClass.getAllOrdersbyUser); //Plurale orders items
orderapi.route("/order_history_details/:orderid").get(AuthorizeJWT.varifyAuthrizetion, OrderProductClass.getOrderDetailsByOrderId); //Singolare Order item 

export default orderapi;