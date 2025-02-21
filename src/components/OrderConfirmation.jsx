import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import { userOrder } from "../../../API/Controllers/Payment";
import ShowOrderProduct from "./ShowOrderProduct";

const OrderConfirmation = () => {
  const { userOrder } = useContext(AppContext);
  const [latestOrder, setLatestOrder] = useState({});
  useEffect(() => {
    if (userorder) {
      setLatestOrder(userOrder[0]);
    }
  }, [userOrder]);

  return (
    <>
      <div className="container text-center  my-4">
        <h1>Your Order has been confirm</h1>
        <h3>It will deliver Soon</h3>
      </div>

      <div className="container">
        <table className="table table-bordered border-primary table-dark my-4">
          <thead>
            <tr>
              <th
                className="text-center"
                scope="col"
                style={{ fontWeight: "bold", fontSize: "20px" }}
              >
                Order Items
              </th>
              <th className="text-center" scope="col">
                Order Details & Shipping Address
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row text-cneter">
                {/* <TableProduct cart={cart} /> */}
                <ShowOrderProduct items={latestOrder?.orderItems} />
              </th>

              <td className="">
                <ul className="" style={{ fontWeight: "bold" }}>
                  <li>OrderId: {latestOrder?.orderId}</li>
                  <li>PaymentId : {latestOrder?.paymentId}</li>
                  <li>PaymentStatus : {latestOrder?.paymentStatus}</li>
                  <li>Name : {latestOrder?.userShipping?.fullName}</li>
                  <li>Phone : {latestOrder?.userShipping?.PhoneNumber}</li>
                  <li>Country : {latestOrder?.userShipping?.country}</li>
                  <li>State : {latestOrder?.userShipping?.state}</li>

                  <li>Pincode : {latestOrder?.userShipping?.Pincode}</li>
                  <li>Near By : {latestOrder?.userShipping?.address}</li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="container text-center">
        {/* <button
          className="btn btn-primary my-2"
          style={{ fontWeight: "bold", color: "white", fontSize: "18px" }}
        >
          Procced to Pay
        </button> */}
      </div>
    </>
  );
};

export default OrderConfirmation;
