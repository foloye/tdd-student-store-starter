import * as React from "react"
import "./ShoppingCart.css"
import { useState } from 'react';

export default function ShoppingCart(props) {
  let subtotal = 0;
  {props.shoppingCart.map((item, idx) => (

    subtotal+=(item["quantity"])*((Math.round(props.products[item["itemId"] - 1].price * 100) / 100).toFixed(2))
      
    

  ))}
  let preTax = subtotal * (0.0875)
  let tax = ((Math.round(preTax * 100) / 100).toFixed(2))
  console.log("This is tax" +tax)
  
  let preTotal = preTax+subtotal
  console.log("This is total: " +preTotal)
  let total = ((Math.round(preTotal * 100) / 100).toFixed(2))
  //console.log(console.log(props.products[item["itemId"] - 1].name))
  console.log("This is subtotal " +subtotal)
  return (
    <div className="shoppingCart">
        <div className = "cartList">
            <div className="headerRow">
                <h2>Name</h2>
                <h2>Quantity</h2>
                <h2>Unit Price</h2>
                <h2>Cost</h2>
            </div>
            <hr/>
            <br/>
            {props.shoppingCart.map((item, idx) => (
              <div>
                <div className="productRow" key={idx}>
                

                <span className="cart-product-name">{props.products[item["itemId"] - 1].name}</span>
                <span className="cart-product-quantity">{item["quantity"]}</span>
                <span className="cart-product-price">${(Math.round(props.products[item["itemId"] - 1].price * 100) / 100).toFixed(2)}</span>
                <span className="cart-product-subtotal">${((item["quantity"])*((Math.round(props.products[item["itemId"] - 1].price * 100) / 100))).toFixed(2)}</span>
                
              </div>
              <div>
              <hr></hr>
              </div> 
              </div> 
              
                
              

            ))}
                
                
            
        </div>
        <div className = "totals">
            <div className="total">
              <h2 className="cartTitle">Subtotal</h2> <h2 className="nums">${subtotal.toFixed(2)}</h2>
              <br/>
            </div>
            <hr/>
            <div className="total">
              <h2 className="cartTitle">Taxes and Fees</h2><h2 className="nums">${preTax.toFixed(2)}</h2>
            <br/></div><hr/>
            <div className="total">
              <h2 className="cartTitle">Total</h2><h2 className="nums">${preTotal.toFixed(2)}</h2>
              <br/>

            </div><hr/>
                
                
                
                
            
            
        </div>
        
    </div>
  )
}