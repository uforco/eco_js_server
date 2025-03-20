import orderapi from "../../lib/Routing.js";
import OrderProductClass from "../controllers/OrderProduct.js";

orderapi.route("/order").post(OrderProductClass.createOrderProduct);

orderapi.route("/orders_history/:userid").get(OrderProductClass.getAllOrdersbyUser); //Plurale orders items

orderapi.route("/order-history/:orderid").get(OrderProductClass.getOrderDetailsByOrderId); //Singolare Order item 



export default orderapi;