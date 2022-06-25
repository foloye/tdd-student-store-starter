import * as React from "react"
import "./Receipt.css"
import {useState} from "react"

export default function Receipt(props) {
    // console.log("THESE ARE PURCHASES")
    // let purchases = props.purchases
    // let lastIdx = purchases.length-1
    // // let lastPurchase = purchases[lastIdx]["order"]
    // // console.log(lastPurchase)
    // // let name = purchases[lastIdx]["name"]
    // // console.log(name)
    // let lastPurchase = [{"ping":"pong"},{"ping":"pong"},{"ping":"pong"},{"ping":"pong"}]
    // console.log(purchases[])
    console.log("THIS IS RECEIPT CONSOLE")
    console.log(props.lastPurchase)
    console.log(props.lastUser)
    
    console.log("END OF RECEIPT CONSOLE")
    console.log(props.products)
    let lastPurchase = props.lastPurchase

    let subtotal = 0
    {lastPurchase.map((item) => (
        subtotal += item.quantity*(props.products[item.itemId-1].price)
    ))}
    return (
    <div className="Receipt">
       <br/>
       <h4> Thank You for your purchase! </h4>
       <br/>
        <h2> Receipt
        </h2>
        <h4>
            Items purchased:
        </h4>
        <div>
        {lastPurchase.map((item, idx) => (
            <h4 key={idx}>{item.quantity}x {props.products[item.itemId-1].name}</h4>
        ))}
        <h4>Grand Total: ${subtotal.toFixed(2)}</h4>
        <h4>Thank you for your purchase, {props.lastUser["name"]}.</h4>
        </div>
    </div>
    )
  
}
