const express = require("express")
const Store = require("../models/store")
//const { NotFoundError } = require("../utils/errors")
const router = express.Router()

// list all products
router.get("/store", async (req, res, next) => {
  try {
    const products = await Store.listProducts()
    res.status(200).json({ "products": products })
  } catch (err) {
    next(err)
  }
})

router.get("/purchases", async (req, res, next) => {
  try {
    const purchases = await Store.listPurchases()
    res.status(200).json({ "purchases": purchases })
  } catch (err) {
    next(err)
  }
})
// get singular product
router.get("/store/:productId", async (req, res, next) => {
  try {
    const productId = req.params.id
    const product = await Store.fetchProductById(productId)
    res.status(200).json({ "product": product })
  } catch (err) {
    next(err)
  }
})

// create new purchase
router.post("/store", async (req, res, next) => {
  try {
    const cart = req.body.shoppingCart
    const user = req.body.user
    const newPurchase = await Store.addOrder(cart, user)
    res.status(201).json({ "purchase": newPurchase })
  } catch (err) {
    next(err)
  }
})




module.exports = router
