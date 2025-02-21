import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import TableProduct from "./TableProduct";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cart, userAddress, url, user,clearCart } = useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  const navigate =  useNavigate()

  useEffect(() => {
    let qty = 0;
    let price = 0;
    if (cart?.items) {
      for (let i = 0; i < cart.items?.length; i++) {
        qty += cart.items[i].qty;
        price += cart.items[i].price;
      }
    }
    setPrice(price);
    setQty(qty);
  }, [cart]);

  const handlePayment = async () => {
    try {
      const orderRespose = await axios.post(`${url}/payment/checkout`, {
        amount: price,
        qty : qty,
        cartItems: cart?.items,
        userShipping: userAddress,
        userId: user._id,
      });

      // console.log("order response", orderRespose);

      //  for Razor pay

      const {orderId, amount: orderAmount} = orderRespose.data

      var options = {
        "key": "RAZORPAY_KEY_ID=rzp_test_gHH71104gcSjCq", // Enter the Key ID generated from the Dashboard
        "amount": orderAmount*100, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        "currency": "INR",
        "name": "FJ",
        "description": "Test Transaction",
        "image": "https://example.com/your_logo",
        "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
        handler: async function (response){

          const  paymentData = {
            orderId : response.razorpay_order_id,
            paymentId:response.razorpay_payment_id,
            signature:response.razorpay_signature,
            amount : orderAmount,
            orderItems : cart?.items,
            userId: user._id,
            userShipping: userAddress
          }

          const api = await axios.post(`${url}/payment/verify-payment`,paymentData);

          if(api.data.success){

            clearCart( )
            
            navigate('/orderconfirmation')
  
          }


         

        },
        "prefill": {
            "name": "FJ",
            "email": "francisjame",
            "contact": "900000000"
        },
        "notes": {
            "address": "Razorpay Corporate Office"
        },
        "theme": {
            "color": "#3399cc"
        }
    };
    const rzp = new window.Razorpay(options);
    rzp.open();

    } catch (error) {
      console.log(error);
    }
  };

  console.log("user address", userAddress);

  return (
    <>
      <div className="container my-4">
        <h1 className="text-center">Order Summary</h1>

        <table className="table table-bordered border-primary table-dark my-4">
          <thead>
            <tr>
              <th
                className="text-center"
                scope="col"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Product details
              </th>
              <th className="text-center" scope="col">
                Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row text-cneter">
                <TableProduct cart={cart} />
              </th>

              <td className="">
                <ul className="" style={{ fontWeight: "bold" }}>
                  <li>Name : {userAddress?.fullName}</li>
                  <li>Phone : {userAddress?.PhoneNumber}</li>
                  <li>Country : {userAddress?.country}</li>
                  <li>State : {userAddress?.state}</li>
                  <li>Pincode : {userAddress?.Pincode}</li>
                  <li>Near By : {userAddress?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center">
        <button
          className="btn btn-primary my-2"
          style={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
          onClick={ handlePayment}
        >
          Procced to Pay
        </button>
      </div>
    </>
  );
};

export default Checkout;
