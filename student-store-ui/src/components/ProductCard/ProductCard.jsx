import * as React from "react"
import "./ProductCard.css"

export default function ProductCard(props) {
  return (
    <div className="productCard">
        <div className="item">
            <p>{props.name} </p>
            <p>Price: ${(Math.round(props.price * 100) / 100).toFixed(2)}</p>
            <img className="productPhoto"  src={props.image} />
            <br/>
          
              <button className="add cartBtn" /*onClick={props.handleAddItemToCart(props.key)}*/>+</button>
              <button className="remove cartBtn" /*onClick={props.handleRemoveItemFromCart(props.key)}*/>-</button>
          
            
         </div>
    </div>
  )
}