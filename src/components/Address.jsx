import React, { useContext, useState } from "react";
import AppContext from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Address = () => {
  const { shippingAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNumber: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const { fullName, address, city, state, country, pincode, phoneNumber } =
    formData;

  // console.log(formData);

  const submitHandler = async (e) => {
    e.preventDefault();

    const result = await shippingAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNumber
    );

    if (result.success) {
      navigate("/checkout");
    }

    setFormData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNumber: "",
    });
  };

  return (
    <div
      className="container my-5 p-5"
      style={{ border: "2px solid yellow", borderRadius: "10px" }}
    >
      <h1 className="text-center">Shipping Address</h1>
      <form onSubmit={submitHandler}>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="name" className="form-label">
              full Name
            </label>
            <input
              name="fullName"
              value={formData.fullName}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="name"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="email" className="form-label">
              Country
            </label>
            <input
              name="country"
              value={formData.country}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="email"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="password" className="form-label">
              State
            </label>
            <input
              name="state"
              value={formData.state}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="password"
            />
          </div>
        </div>
        <div className="row">
          <div className="mb-3 col-md-4">
            <label htmlFor="name" className="form-label">
              City
            </label>
            <input
              name="city"
              value={formData.city}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="name"
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="email" className="form-label">
              Pin-Code
            </label>
            <input
              name="pincode"
              value={formData.pincode}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="email"
              // placeholder="Enter 6-digit pin-code"
              // maxLength={6}
            />
          </div>
          <div className="mb-3 col-md-4">
            <label htmlFor="password" className="form-label">
              Phone Number
            </label>
            <input
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={onChangeHandler}
              type="tel"
              className="form-control bg-dark text-light"
              id="phoneNumber"
              // maxLength={10}
            />
          </div>
        </div>

        <div className="row">
          <div className="mb-3 ">
            <label htmlFor="password" className="form-label">
              Address/Nearby
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={onChangeHandler}
              type="text"
              className="form-control bg-dark text-light"
              id="password"
            />
          </div>
        </div>

        <div className="d-grid col-5 mx-auto">
          <button type="submit" className="btn btn-primary my-3" style={{fontWeight:'bold'}}>
            Submit
          </button>
        </div>
      </form>
      {userAddress &&(

      <div className="d-grid col-5 mx-auto">
        <button type="submit" className="btn btn-warning" style={{fontWeight:'bold'}} onClick={()=>navigate('/checkout')}>
          Use Old Address
        </button>
      </div>
      )}
    </div>
  );
};

export default Address;
