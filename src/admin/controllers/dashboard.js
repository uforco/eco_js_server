
import prisma from '../../DB/db.config.js'

class DashBoardAnalytics {
    static async totalUesrOrderProductReview (req, res) {
  
        
        const lastMonthStart = new Date(new Date().getFullYear(), new Date().getMonth(), 1); // First day of last month
        const lastMonthEnd = new Date(new Date().getFullYear(), new Date().getMonth()+1, 0); // Last day of last month

        const totalProducts = await prisma.product.count({
            where: {
                createdAt: {
                    gte: lastMonthStart,
                    lte: lastMonthEnd,
                },
            },
        });


        res.send({LatsMonthOfProduct: totalProducts})
    }
}

export default DashBoardAnalytics