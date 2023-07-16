import React, { useState, Fragment, useEffect } from "react";
import { useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import MetaData from "../layout/MetaData";
import "./Search.css";

const Search = ({ history }) => {
  const dispatch = useDispatch();
  const [keyword, setKeyword] = useState("");

  /*
    Herer History.push method is very important because when user will click on the search button if the keyword in give by user then it will indirect user to /keyword path else redirect it to /products path
  
  */

  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/products");
    }
  };

  useEffect(() => {
    dispatch(getProduct(keyword));
  }, [dispatch, keyword]);

  return (
    <Fragment>
      <MetaData title="Search A Product -- ECOMMERCE" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Search by name... e.g.itachi "
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
