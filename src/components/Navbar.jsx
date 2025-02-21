import React, { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import AppContext from "../context/AppContext";

const Navbar = () => {
  const [SerchTerm, setSerchTerm] = useState(" ");
  const navigate = useNavigate();
  const location = useLocation();
  const { setfilteredData, products, Logout, isAuthenticated,  cart } =
    useContext(AppContext);

  const filterbyCategory = (cat) => {
    setfilteredData(
      products.filter(
        (data) => data.category.toLowerCase() == cat.toLowerCase()
      )
    );
  };
  const filterbyPrice = (price) => {
    setfilteredData(products.filter((data) => data.price >= price));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    navigate(`/product/search/${SerchTerm}`);
    setSerchTerm(" ");
  };
  return (
    <>
      <div className="nav sticky-top">
        <div className="nav_bar">
          <Link
            to={"/"}
            className="left "
            style={{ textDecoration: "none", color: "white" }}
          >
            <h3>MERN E - Commerce</h3>
          </Link>
          <form className="search_bar" onSubmit={submitHandler}>
          
            <span className="material-symbols-outlined "><svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#000000"><path d="M784-120 532-372q-30 24-69 38t-83 14q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l252 252-56 56ZM380-400q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg></span>
            <input
              value={SerchTerm}
              onChange={(e) => setSerchTerm(e.target.value)}
              type="text"
              placeholder="Search Products..."
            />
          </form>
          <div className="right">
            {isAuthenticated && (
              <>
              
                <Link to={'/cart'}
                  type="button"
                  className="btn btn-primary position-relative mx-3"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="28px"
                    fill="#FFFFFF"
                  >
                    <path d="m480-560-56-56 63-64H320v-80h167l-64-64 57-56 160 160-160 160ZM280-80q-33 0-56.5-23.5T200-160q0-33 23.5-56.5T280-240q33 0 56.5 23.5T360-160q0 33-23.5 56.5T280-80Zm400 0q-33 0-56.5-23.5T600-160q0-33 23.5-56.5T680-240q33 0 56.5 23.5T760-160q0 33-23.5 56.5T680-80ZM40-800v-80h131l170 360h280l156-280h91L692-482q-11 20-29.5 31T622-440H324l-44 80h480v80H280q-45 0-68.5-39t-1.5-79l54-98-144-304H40Z" />
                  </svg>
                  {cart?.items?.length > 0 && (
                    
                     <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                     {cart?.items?.length}
                     <span className="visually-hidden">unread messages</span>
                   </span>

)}

                 
                </Link>
                <Link to={"/profile"} className="btn btn-info mx-3">
                  Profile
                </Link>
                <button
                  className="btn btn-danger mx-3"
                  onClick={() => {
                    Logout();
                    navigate("/");
                  }}
                >
                  Logout
                </button>
              </>
            )}

            {!isAuthenticated && (
              <>
                <Link to={"/login"} className="btn btn-secondary mx-3">
                  Login
                </Link>
                <Link to={"/register"} className="btn btn-info mx-3">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>

        {location.pathname == "/" && (
          <div className="sub_bar">
            <div className="items" onClick={() => setfilteredData(products)}>
              No Filter
            </div>
            <div className="items" onClick={() => filterbyCategory("mobiles")}>
              Mobiles
            </div>
            <div className="items" onClick={() => filterbyCategory("Laptops")}>
              Laptops
            </div>
            <div className="items" onClick={() => filterbyCategory("cameras")}>
              Camera's
            </div>
            <div
              className="items"
              onClick={() => filterbyCategory("headphones")}
            >
              HeadPhones
            </div>
            <div className="items" onClick={() => filterbyPrice(999)}>
              15000
            </div>
            <div className="items" onClick={() => filterbyPrice(19000)}>
              19999
            </div>
            <div className="items" onClick={() => filterbyPrice(999)}>
              999
            </div>
            <div className="items" onClick={() => filterbyPrice(50000)}>
              50000
            </div>
            <div className="items" onClick={() => filterbyPrice(22399)}>
              300000
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
