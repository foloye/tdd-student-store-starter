import * as React from "react"
import "./CheckoutForm.css"
import {useState} from "react"

export default function CheckoutForm(props) {

    
    return (
    <div className="checkout-form">
       <label>Name</label>
       <input className="checkout-form-input" onChange={(event) => props.handleOnCheckoutFormChange(event.target.name,event.target.value)} name="name" type="text" placeholder="Full Name" value={props.checkoutForm.name}/>
       <label>School Email</label>
        <input className="checkout-form-input" onChange={(event) => props.handleOnCheckoutFormChange(event.target.name,event.target.value)} name="email" type="email" placeholder="student@codepath.org" value={props.checkoutForm.email}/>
        <br/>
        <button className="checkout-button" onClick={props.handleOnSubmitCheckoutForm}>Checkout</button>
    </div>
    )
  
}
