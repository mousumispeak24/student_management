import React, { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";

const HomeContainer = (props) => {
  const { children } = props;

  const dispatch = useDispatch();

  return (
    <Fragment>
      {children}
    </Fragment>
  );
};
export default HomeContainer;
