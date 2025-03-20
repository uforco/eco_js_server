import express from "express";
import dashboard from "./admin/routes/dashboard.js";
import product from "./admin/routes/product.js";
import cors from "cors";
import prisma from "./DB/db.config.js";
import productWebApi from "./web/router/productApi.js";
import userDetails from "./web/router/user.js";
import orderapi from "./web/router/orderApi.js";


const app = express();
const port = process.env.PORT || 4000;

app.use(cors({
  origin: ['https://ecobazar-phi.vercel.app/', 'http://localhost:3000/']
}))
app.use(express.json({ limit: "100mb" })); // Some versions of Express accept "Infinity"
app.use(express.urlencoded({ limit: "100mb", extended: true }));


app.use('/admin', dashboard)
app.use('/admin', product)


// const authorizeion = ( req, res, next ) => {
//  console.log("authorizeion")
// }



app.use('/web', productWebApi)
app.use('/web', userDetails)
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
