import express from 'express'
const router = express.Router()
import {
  getProducts,
  getProductById,
} from '../controllers/productController.js'

router.route('/').get(getProducts) // GET request to the root URL, call the getProducts function
router.route('/:id').get(getProductById) // GET request to the URL with an ID parameter, call the getProductById function

export default router // export the router
