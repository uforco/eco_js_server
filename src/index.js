import express from "express";
import dashboard from "./admin/routes/dashboard.js";
import product from "./admin/routes/product.js";
import cors from "cors";
import prisma from "./DB/db.config.js";


const app = express();
const port = process.env.PORT || 4000;

app.use(cors())
app.use(express.json({ limit: "100mb" })); // Some versions of Express accept "Infinity"
app.use(express.urlencoded({ limit: "100mb", extended: true }));


app.use('/admin', dashboard)
app.use('/admin', product)

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
