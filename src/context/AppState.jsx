import React, { useEffect, useState } from "react";
import AppContext from "./AppContext";
import axios from "axios";
import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AppState = (props) => {
  const url = "https://mern-e-commerce-api-vrhq.onrender.com/api";

  const [products, setproducts] = useState([]);
  const [token, settoken] = useState([]);
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [filteredData, setfilteredData] = useState([]);
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([])
  const [reload, setReload] = useState(false)
  const [userAddress, setUserAddress] = useState("")
  const [userOrder, setUserOrder] = useState("")

  useEffect(() => {
    const fetchProduct = async () => {
      const api = await axios.get(`${url}/product/all`, {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      });

      // console.log(api.data.products);
      setproducts(api.data.products);
      setfilteredData(api.data.products);
      userProfile();
      user_Order()
    };

    fetchProduct();
    userCart();
    getAddress(); 
  }, [token,reload]);

  useEffect(() => {
    let lsToken = localStorage.getItem("token");

    if (lsToken) {
      settoken(lsToken);
      setisAuthenticated(true);
    }
    // console.log(lsToken);
  }, []);

  // register user

  const register = async (Name, email, password) => {
    const api = await axios.post(
      `${url}/user/register`,
      { Name, email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    //  alert(api.data.message)
    // console.log('user register',api);

    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    return api.data;
  };

  // Login user

  const login = async (email, password) => {
    const api = await axios.post(
      `${url}/user/login`,
      { email, password },
      {
        headers: {
          "Content-Type": "Application/json",
        },
        withCredentials: true,
      }
    );
    //  alert(api.data.message)

    toast.success("Login Successfully...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    // console.log('user login',api.data);
    settoken(api.data.token);
    setisAuthenticated(true);
    localStorage.setItem("token", api.data.token);
    return api.data;
  };

  // Logout user

  const Logout = () => {
    setisAuthenticated(false);
    settoken(" ");
    localStorage.removeItem("token");
    toast.success("Logout Successfully...", {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
  };

  // user Profile

  const userProfile = async () => {
    const api = await axios.get(`${url}/user/profile`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });

    // console.log(api.data);
    setUser(api.data.user);
    // setproducts(api.data.products);
    // setfilteredData(api.data.products)
  };

  //  Add to Cart

  const addToCart = async (productId,title,price,qty,imgSrc) => {
    const api = await axios.post(`${url}/cart/add`,{productId,title,price,qty,imgSrc}, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setReload(!reload)

    // console.log("My Cart",api);
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

   
  };

  // User Cart

  const userCart = async () => {
    const api = await axios.get(`${url}/cart/user`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
    });
    setCart(api.data.cart)
   
  };


  // --qty
  const decreaseQty = async (productId, qty) => {
  try {
    const api = await axios.post(`${url}/cart/--qty`, { productId, qty }, {
      headers: {
        "Content-Type": "application/json",  
        "Auth": token,
      },
      withCredentials: true,
    });

    setReload(!reload);  // Trigger a reload to refresh cart data
    toast.success(api.data.message, {
      position: "top-right",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });

    setCart(api.data.cart);  // Update cart state with the latest data

  } catch (error) {
    console.error("Error decreasing quantity:", error);
    // Optionally, you could show a user-friendly error message here
  }
};

  // Remove Items from cart

  const removeFromCart = async (productId) => {
    try {
      const api = await axios.delete(`${url}/cart/remove/${productId}`,  {
        headers: {
          "Content-Type": "application/json",  
          "Auth": token,
        },
        withCredentials: true,
      });
  
      setReload(!reload);  // Trigger a reload to refresh cart data
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      setCart(api.data.cart);  // Update cart state with the latest data
  
    } catch (error) {
      console.error("Product is not remove:", error);
      // Optionally, you could show a user-friendly error message here
    }
  };

  // Clear Cart

  const clearCart = async () => {
    try {
      const api = await axios.delete(`${url}/cart/clear/`,  {
        headers: {
          "Content-Type": "application/json",  
          "Auth": token,
        },
        withCredentials: true,
      });
  
      setReload(!reload);  // Trigger a reload to refresh cart data
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      setCart(api.data.cart);  // Update cart state with the latest data
  
    } catch (error) {
      console.error("Cart is not Clear:", error);
      // Optionally, you could show a user-friendly error message here
    }
  };

  //  shipping Address

  const shippingAddress = async (fullName, address, city, state, country, Pincode, PhoneNumber) => {
    try {
      const api = await axios.post(`${url}/address/add/`,{fullName, address, city, state, country, Pincode, PhoneNumber},  {
        headers: {
          "Content-Type": "application/json",  
          "Auth": token,
        },
        withCredentials: true,
      });
  
      setReload(!reload);  // Trigger a reload to refresh cart data
      toast.success(api.data.message, {
        position: "top-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
  
      // setCart(api.data.cart);  // Update cart state with the latest data
      return api.data
  
    } catch (error) {
      console.error("Shipping address not acceptable :", error);
      // Optionally, you could show a user-friendly error message here
    }
  };

  // get user Latest address

  const getAddress = async () => {
    const api = await axios.get(`${url}/address/get`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
     
    });

    setUserAddress(api.data.userAddress)

  
  };

  //  user Order

  const user_Order = async () => {
    const api = await axios.get(`${url}/payment/userorder`, {
      headers: {
        "Content-Type": "Application/json",
        Auth: token,
      },
      withCredentials: true,
     
    });

    // setUserAddress(api.data.userAddress)
    setUserOrder(api.data)

  
  };

  

  return (
    <div>
      <AppContext.Provider
        value={{
          products,
          register,
          login,
          url,
          token,
          setisAuthenticated,
          isAuthenticated,
          filteredData,
          setfilteredData,
          Logout,
          user,
          addToCart,
          cart,
          decreaseQty,
          removeFromCart,
          clearCart,
          shippingAddress,
          userAddress,
          userOrder,
          
        }}
      >
        {props.children}
      </AppContext.Provider>
    </div>
  );
};

export default AppState;
