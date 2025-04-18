import dotenv from 'dotenv';
// Load environment variables
dotenv.config();
import express from "express";
import dashboard from "./admin/routes/dashboard.js";
import product from "./admin/routes/product.js";
import cors from "cors";
import prisma from "./DB/db.config.js";
import productWebApi from "./web/router/productApi.js";
import userDetails from "./web/router/user.js";
import orderapi from "./web/router/orderApi.js";
import product_cart from "./web/router/productCart.js";

export const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: [process.env.WEB_FONT_END, 'http://localhost:3000', process.env.WEB_ADMIN],
}))
app.use(express.json({ limit: "100mb" })); // Some versions of Express accept "Infinity"
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use('/admin', dashboard)
app.use('/admin', product)


app.use('/web', productWebApi)
app.use('/web', userDetails)
app.use('/web', product_cart)
app.use('/web', orderapi)


async function checkConnection() {
  try {
    await prisma.$connect();
    console.log('✅ Database connected successfully');
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  } finally {
    await prisma.$disconnect();
  }
}
checkConnection();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
