import productWebApi from '../../DB/db.config.js'
import ProductClass from '../controllers/ProductClass.js'


productWebApi.route('/product').get(ProductClass.allProducts)

export default productWebApi