import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import RelatedProduct from "./RelatedProduct";
import AppContext from "../../context/AppContext"; // Import AppContext

const ProductDetail = () => {
  const { id } = useParams();
  const url = "http://localhost:4000/api";

  const [product, setProduct] = useState();
  const { addToCart } = useContext(AppContext); // Get addToCart from context

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const api = await axios.get(`${url}/product/${id}`, {
          headers: {
            "Content-Type": "Application/json",
          },
          withCredentials: true,
        });

        setProduct(api.data.product);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  return (
    <>
      <div
        className="container text-center my-5"
        style={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <div className="left">
          <img
            src={product?.imgSrc}
            alt={product?.title}
            style={{
              width: "200px",
              height: "250px",
              borderRadius: "10px",
              border: "2px solid yellow",
            }}
          />
        </div>
        <div className="right">
          <h1>{product?.title}</h1>
          <p>{product?.description}</p>
          <h1>{product?.price} {"₹"}</h1>

          <div className="my-5">
            {/* <button className="btn btn-danger mx-3" style={{ fontWeight: "bold" }}>
              Buy Now
            </button> */}
            <button
              className="btn btn-warning"
              style={{ fontWeight: "bold" }}
              onClick={() =>
                addToCart(product?._id, product?.title, product?.price, 1, product?.imgSrc)
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <RelatedProduct category={product?.category} />
    </>
  );
};

export default ProductDetail;
