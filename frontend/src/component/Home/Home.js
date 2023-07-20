import React, { Fragment, useEffect } from "react";

import "./Home.css";
import MetaData from "../layout/MetaData";
import ProductCard from "./ProductCard";
// import { Rating } from "@material-ui/lab";
import { clearErrors, getProduct } from "../../actions/productAction";

import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";

//to use the alert that we created import
import { useAlert } from "react-alert";

const Home = () => {

  const alert = useAlert();

  //use reducer
  const dispatch = useDispatch();
  //hame jo backend se data aaya hai usko useSelectors  ka use karke lene and use karenge
  const { loading, error, products } = useSelector((state) => state.products);

  //--------------------------------------------
  useEffect(() => {
    if (error) {
      console.log("ERROR");
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, alert, error]);
  //--------------------------------------------
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="ECOMMERCE" />

          <div className="banner">
            <p>Welcome to AniMates</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

            <a href="#container">
              <button>Shop Now</button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};
export default Home;
