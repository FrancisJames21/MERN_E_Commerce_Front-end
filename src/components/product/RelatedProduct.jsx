import React, { useContext, useEffect, useState } from "react";
import AppContext from "../../context/AppContext";
// import { product } from '../../../../API/Models/Product'
import { Link } from "react-router-dom";
// import { Products } from '../../../../API/Models/Product'

const RelatedProduct = ({ category }) => {
  const { products } = useContext(AppContext);
  const [RelatedProduct, setRelatedProduct] = useState([]);

  useEffect(() => {
    setRelatedProduct(
      products.filter(
        (data) => data?.category?.toLowerCase() == category?.toLowerCase()
      )
    );
  }, [category, products]);

  return (
    <>
      <div className="container text-center">
        <h1> RelatedProduct</h1>
        <div className="container  d-flex justify-content-center align-item-center  ">
          <div className="row container d-flex justify-content-center align-item-center my-5">
            {RelatedProduct?.map((product) => (
              <div
                key={product.id}
                className=" my-3 col-md-4 d-flex justify-content-center align-item-center"
              >
                <div
                  className="card bg-dark text-light text-center"
                  style={{ width: "18rem" }}
                >
                  <Link
                    to={`/product/${product._id}`}
                    className="d-flex justify-content-center align-item-center p-3"
                  >
                    <img
                      src={product.imgSrc}
                      className="card-img-top"
                      alt="..."
                      style={{
                        width: "200px",
                        height: "250px",
                        borderRadius: "10px",
                        border: "2px solid yellow",
                      }}
                    />
                  </Link>
                  <div className="card-body">
                    <h5 className="card-title">{product.title}</h5>

                    <div className="my-3">
                      <button className="btn btn-primary mx-3">
                        {product.price} {" ₹ "}
                      </button>

                      <button className="btn btn-warning">Add To Cart</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default RelatedProduct;
