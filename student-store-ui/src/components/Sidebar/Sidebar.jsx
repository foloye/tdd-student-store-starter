import * as React from "react"
import "./Sidebar.css"
import ShoppingCart from "../ShoppingCart/ShoppingCart"
import CheckoutForm from "../CheckoutForm/CheckoutForm"
import Receipt from "../Receipt/Receipt"

export default function Sidebar(props) {
 
  
  let displayCart;
  if (props.isOpen == true) {
    displayCart = "open"
  } else {
    displayCart = "closed"
  }

  let closeBar = () => {
    
    props.setIsOpen(false)
    
  }
  let emptyCart = "op"
  let fullCart = "close"
  if (props.shoppingCart.length != 0) {
    emptyCart = "close"
    fullCart ="op"
  }
  let showRe = "clo"
  let showCom = "op"
  if (props.showReceipt) {
    showRe = "op"
    showCom = "clo"
  } 

  
  return (
    <section className="sidebar">
      
      <div className = "wrapper">
        
        <div className= {displayCart}>
          <img className="forwardBtn"alt="back button" src="https://cdn-icons.flaticon.com/png/512/2805/premium/2805303.png?token=exp=1656016431~hmac=fea31959488e580b5e09929f4dffd65f" onClick={closeBar}/>
          <h2>
          Shopping Cart
          </h2>
          <div className={fullCart}>
            <ShoppingCart  isOpen={props.isOpen} products={props.products} shoppingCart={props.shoppingCart}/>
          </div>
          
          <h4 className={emptyCart}>
            No items added to cart yet. Start shopping now!
          </h4>

          <h2>
            Payment Info
          </h2>
          

          <CheckoutForm shoppingCart={props.shoppingCart} isOpen={props.isOpen} checkoutForm={props.checkoutForm} handleOnSubmitCheckoutForm={props.handleOnSubmitCheckoutForm} handleOnCheckoutFormChange={props.handleOnCheckoutFormChange}/>
          <div className={showRe}>
            <Receipt products={props.products}lastPurchase={props.lastPurchase} lastUser={props.lastUser}purchases={props.purchases}/>
          </div>
          <h2 className={showCom}>
            Checkout
          </h2>
          <h4 className={showCom}>
            A confirmation email will be sent to you so that you can confirm this order. Once you have confirmed the order, it will be delivered to your dorm room.
          </h4>
        </div>
        

      </div>
    
    </section>
  )
}
