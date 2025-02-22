import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";


const Cart = () => {
  const { cart, decreaseQty, addToCart, removeFromCart, clearCart } =
    useContext(AppContext);
  const [qty, setQty] = useState(0);
  const [price, setPrice] = useState(0);
  // const unitPrice = product.qty > 0 ? product.price / product.qty : 0;
  const navigate = useNavigate()

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

  return (
    <>
    {cart?.items?.length == 0 ?(

      <>
      <div className="container text-center mt-5 ">
       <button className="btn btn-warning mx-3 " style={{ fontWeight: "bold", fontSize:'20px' }}
       onClick={()=>navigate('/')}
       >
          Continue Shopping
        </button>
        </div>
      
      </>

    ):(

      <>
      <div className="my-5 text-center">
        <button className="btn btn-info mx-3" style={{ fontWeight: "bold" }}>
          Total Qty :- {qty}
        </button>
        <button className="btn btn-warning mx-3" style={{ fontWeight: "bold" }}>
          Total Price :- {price}
        </button>
      </div>
      
      </>

    )}
      
      {cart?.items?.map((product) => (
        <div
          key={product._id}
          className="container p-3 bg-dark my-5 text-center rounded-5"
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <div className="cart_img">
              <img
                src={product.imgSrc}
                alt=""
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
              />
            </div>
            <div className="cart_des">
              <h2>{product.title}</h2>
              <h4>{product.price}</h4>
              <h4>Qty :- {product.qty}</h4>
            </div>
            <div className="cart_action">
              <button
                className="btn btn-warning mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => decreaseQty(product?.productId, 1)}
              >
                Qty--
              </button>
              <button
                className="btn btn-info mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() =>
                  addToCart(
                    product?.productId,
                    product.title,
                    product.price / (product.qty || 1),
                    1,
                    product.imgSrc
                  )
                }
              >
                Qty++
              </button>
              <button
                className="btn btn-danger mx-3"
                style={{ fontWeight: "bold" }}
                onClick={() => {
                  if (confirm("Are you sure, Want to remove form cart")) {
                    removeFromCart(product?.productId);
                  }
                }}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      ))}

      {cart?.items?.length > 0 && (
        <div className="container text-center my-4">
          <button
            className="btn btn-warning mx-3"
            style={{ fontWeight: "bold", fontSize: "19px" }}
            onClick={()=>navigate('/shipping')}
          >
            checkOut
          </button>
          <button
            className="btn btn-danger mx-3 "
            style={{ fontWeight: "bold", fontSize: "19px" }}
            onClick={() => {
              if (confirm("Are you sure, want to clear Cart")) {
                clearCart();
              }
            }}
          >
            Clear cart
          </button>
        </div>
      )}
    </>
  );
};

export default Cart;
