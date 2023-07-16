import React, { useEffect, Fragment } from "react";
import { useAlert } from "react-alert";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction";
import { Rating } from "@material-ui/lab";
import "./ProductDetails.css";
import Loader from "../layout/Loader/Loader";
import MetaData from "../layout/MetaData";
import ReviewCard from "./ReviewCard";
import { useState } from "react";
import { addItemsToCart } from "../../actions/cartAction";

const ProductDetails = ({ match }) => {
  const alert = useAlert();
  console.log(match.params.id);

  //use reducer
  const dispatch = useDispatch();
  //hame jo backend se data aaya hai usko useSelectors  ka use karke lene and use karenge
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );
  console.log(product);

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert]);

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };

  //increment and decrement quantity of the products
  const [quantity, setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (quantity <= 1) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- ECOMMERCE`} />

          <div className="ProductDetails">
            <div>
              {product.images &&
                product.images.map((item, i) => (
                  <img
                    className="CarouselImage"
                    key={i}
                    src={item.url}
                    alt={`${i} Slide`}
                  />
                ))}
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                {/*
                <span className="detailsBlock-2-span">
                {" "}
                ({product.numOfReviews} Reviews)
                </span>
              */}
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input
                      readOnly
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                    />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>

          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
