import productWebApi from '../../lib/Routing.js'
import ProductClass from '../controllers/ProductClass.js'


productWebApi.route('/products').get(ProductClass.allProducts)

export default productWebApi