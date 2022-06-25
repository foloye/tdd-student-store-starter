import * as React from "react"
import Navbar from "../Navbar/Navbar"
import Sidebar from "../Sidebar/Sidebar"
import Home from "../Home/Home"
import ProductsGrid from "../ProductsGrid/ProductsGrid"
import Footer from "../Footer/Footer"
import HeaderNav from "../HeaderNav/HeaderNav"
import HeroBanner from "../HeroBanner/HeroBanner"
import ProductDetail from "../ProductDetail/ProductDetail"
import NotFound from "../NotFound/NotFound"
import Search from "../Search/Search"
import "./App.css"
import { useState } from 'react';
import { BrowserRouter, Link, Routes, Route} from "react-router-dom";
import axios from "axios";


export default function App() {
  const [products, setProducts] = useState([])
  const [errors, setError] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const [shoppingCart, setShoppingCart] = useState([])
  const [checkoutForm, setCheckoutForm] = useState({"name": "", "email": ""})
  const [purchases, setPurchases] = (useState([]))
  const [showReceipt, setShowReceipt] = useState(false)
  const [lastPurchase, setLastPurchase] = useState([])
  const [lastUser, setLastUser] = useState({"name": "", "email": ""})
  
  
  let handleOnToggle = () => {
    console.log("shopping cart has been pressed")
    setIsOpen(true)
    console.log(isOpen)
  }
  
  console.log("This is shopping cart")
  console.log(shoppingCart)

  let handleAddItemToCart = (id) => {
    let bool = false
    let cartCopy = [...shoppingCart]
    if (cartCopy.length == 0) {
      setShoppingCart([{"itemId": id, "quantity": 1}])
      bool = true
    } else {
      for (let i = 0; i < shoppingCart.length; i++) {
        if (cartCopy[i]["itemId"] == id) {
          cartCopy[i]["quantity"] = cartCopy[i]["quantity"]+1
          bool = true
          setShoppingCart([...cartCopy])
        }
      }
    }
    
    if (bool == false) {
      setShoppingCart(cartCopy => [...cartCopy, {"itemId": id, "quantity": 1}])

    }
   

    //loop over copy, if == update item, if it doesn't exist add new item
    //update clone, set shopping clone
    //shoppingCart
    
  }
  let handleRemoveItemFromCart = (id) => {
    
    let cartCopy = [...shoppingCart]
    if (cartCopy.length != 0) {
      for (let i = 0; i < shoppingCart.length; i++) {
        if (Object.values(cartCopy[i]).includes(id)) {
          if (cartCopy[i]["quantity"] == 1) {
            cartCopy[i]["quantity"] = 0
            cartCopy = cartCopy.filter(item => item.itemId != id)

          } else{
            cartCopy[i]["quantity"] = cartCopy[i]["quantity"]-1
          }
          
          
          setShoppingCart([...cartCopy])
        }
      }
    }
    
  
  }
  let handleOnCheckoutFormChange   = (name, value) => {
    
    setCheckoutForm({...checkoutForm, [name]:value})
    

  }
  async function handleOnSubmitCheckoutForm () {
    try {
      const form = axios.post(`http://localhost:3001/store`, {"shoppingCart": shoppingCart, "user": checkoutForm}).then
    } catch (err){
      console.log(err)
    }
    setLastPurchase(shoppingCart)
    setLastUser(checkoutForm)
    setShowReceipt(true)
    setShoppingCart([])
    setCheckoutForm({"name": "", "email": ""})

    


  }
  
  

  React.useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get('http://localhost:3001/store');
        const data = response.data.products
        setProducts(data)
      } catch (error) {
        console.error("An error occured")
        setError(error)
      }
      
    }
    getProducts();

  }, [])
  React.useEffect(() => {
    async function getPurchases() {
      try {
        const response = await axios.get('http://localhost:3001/purchases');
        const data = response.data.purchases
        setPurchases(data)
      } catch (error) {
        console.error("An error occured")
        setError(error)
      }
      
    }
    getPurchases();

  }, [])



  return (
    <div className="app">
      <BrowserRouter>
        <main>
          {/* YOUR CODE HERE! */}
          <Navbar />
          <img className="cart"alt="image of shopping cart" src="https://www.freepnglogos.com/uploads/shopping-cart-png/shopping-cart-png-image-download-pngm-2.png" onClick={handleOnToggle}/>
          <Sidebar lastPurchase={lastPurchase} showReceipt={showReceipt} lastUser={lastUser} purchases={purchases} isOpen={isOpen} setIsOpen={setIsOpen} checkoutForm={checkoutForm} handleOnCheckoutFormChange={handleOnCheckoutFormChange} handleOnSubmitCheckoutForm={handleOnSubmitCheckoutForm} products={products} handleOnToggle={handleOnToggle} shoppingCart={shoppingCart}/>
          
          
          <div className="welcome">
            <h1>
              Welcome to the Student Store!
              Find your merch down below!
            </h1>
            {/*<img src="https://live.staticflickr.com/3932/14910658133_5f4337c82b_w.jpg" alt="image of college logo"/>
          */}</div>
          <br/>
          

          
          <Routes>
            <Route path ="/products/:productId" element = {<ProductDetail/>}/>
            <Route path ="/" element = {<Home products={products} shoppingCart={shoppingCart} setSearchTerm={setSearchTerm} searchTerm={searchTerm}  handleAddItemToCart={handleAddItemToCart} handleRemoveItemFromCart={handleRemoveItemFromCart}/>}/>
            <Route path ="*" element = {<NotFound/>}/>
          </Routes>
          <br/>
          <div className="about">
            <h2 className= "about-text">
              The codepath student store offers great products at great prices from a great team and for a great cause.

              We've searched far and wide for items that perk the interests of even the most eccentric students and decided to offer them all here in one place.

              All proceeds go towards bringing high quality CS education to college students around the country.
            </h2>
            </div>
          <br/>
          <div className="contact-us">
            <h2>
              Email:    code@path.org
            </h2>
            <h2>
              Phone:    1-800-CODEPATH
            </h2>
            <h2>
              Address:    123 Fake Street, San Francisco, CA
            </h2>
          </div>



        </main>
      </BrowserRouter>
    </div>
  )
}
