import product from "../../lib/Routing.js";
import AdminProductAnalytics from "../controllers/AdminProductAnalytics.js";

product.route("/product/count-Month-product-chart").get(AdminProductAnalytics.totalProductChartMonth);

product.route("/product").post(AdminProductAnalytics.createProduct);

product.route("/product/stock").get(AdminProductAnalytics.getProductStock);

product.route("/product/update-stock/:productId").put(AdminProductAnalytics.updateStock);

export default product;
