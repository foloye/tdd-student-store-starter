//const { BadRequestError } = require("../utils/errors")
const { storage } = require("../data/storage")

class Store {
    static async listProducts() {
      // list all items in the products array
      const products = storage.get("products").value()
      return products
    }
    static async listPurchases() {
      // list all items in the products array
      const purchases = storage.get("purchases").value()
      return purchases
    }
    static async fetchProductById(productId) {
      // fetch a single product
      const product = storage
        .get("products")
        .find({ id: Number(productId) })
        .value()
      return product
    }
    static async addOrder(shoppingCart, user) {
      // create a new purchase order

      if (!shoppingCart || !user) {
        throw new Error("incorrect inputs");
      }

      const requiredFields = ["itemId", "quantity"]
      var valueArr = shoppingCart.map(function(item){ return item.itemId });
      var isDuplicate = valueArr.some(function(item, idx){ 
        return valueArr.indexOf(item) != idx 
      })
      if (isDuplicate) {
        throw new Error("duplicate");
      }

      requiredFields.forEach((field) => {
        if (!(field in shoppingCart[0])) {
          throw new Error("incorrect titles");
        }
      })


     
        
     



      let total = 0
      for (let i = 0; i < shoppingCart.length; i++) {
        let quantity = shoppingCart[i]["quantity"]
        const item = storage
          .get("products")
          .find({ id: Number(shoppingCart[i]["itemId"]) })
          .value()
        // let item = await fetchProductById(shoppingCart[i]["itemId"])
        let price = item.price
        let subtotal = quantity*price
        subtotal = (subtotal  * (0.0875))+(subtotal)
        total += subtotal

      }
      total = total.toFixed(2)
      const purchases = await Store.listPurchases()
      const purchaseId = purchases.length + 1
      const createdAt = new Date().toISOString()

      let name = user["name"]
      let email = user["email"]
      let order = shoppingCart
      

  
      const newPurchase = { "name": name, "email": email, "order":order, "total": total, "createdAt": createdAt}
  
      storage.get("purchases").push(newPurchase).write()
  
      return newPurchase
    }

  
  
  }
  
module.exports = Store
  