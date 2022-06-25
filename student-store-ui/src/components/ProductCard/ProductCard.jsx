import * as React from "react"
import "./ProductCard.css"

export default function ProductCard(props) {
  // console.log(props.handleRemoveItemFromCart(0)) 
  let quantity = 0
  
  for (let i = 0; i < props.shoppingCart.length; i++) {
    if (props.shoppingCart[i]["itemId"] == props.id) {
      quantity = props.shoppingCart[i]["quantity"]
    }
  }
  let quaDiv = "closed"
  if (quantity != 0){
    quaDiv = "quan"
  }
  
  
  return (
    <div className="productCard">
        <div className="item">
            <p>{props.name} </p>
            <p>Price: ${(Math.round(props.price * 100) / 100).toFixed(2)}</p>
            <img className="productPhoto"  src={props.image} />
            <br/>
            
          
            <button className="add cartBtn" onClick={() => {props.handleAddItemToCart(props.id)}}>+</button>
            <div className={quaDiv}>
              <h4>{quantity}</h4>
            </div>
            <button className="remove cartBtn" onClick={() => {props.handleRemoveItemFromCart(props.id)}}>-</button>
        
          
            
         </div>
    </div>
  )
}