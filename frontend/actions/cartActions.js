import axios from "axios";
import React, { useEffect } from "react";
import { CART_ADD_ITEM, CART_REMOVE_ITEM, CART_SAVE_SHIPPING_ADDRESS, CART_SAVE_PAYMENT_METHOD } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  // const { data } = await axios.get(`/api/products/${id}`)
  console.log("addToCart error:", id)
  const { data } = await axios.get("/api/productid", {
    params: {
      pid: id,
    },
  });

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty,
    },
  });

  if (typeof window !== "undefined") {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(getState().cart.cartItems)
    );

  }
};

export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });


    if (typeof window !== "undefined") {
      localStorage.setItem(
        "cartItems",
        JSON.stringify(getState().cart.cartItems)
      );
    }
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({
      type: CART_SAVE_SHIPPING_ADDRESS,
      payload: data,
  })
  if (typeof window !== "undefined") {
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  }
}

export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({
      type: CART_SAVE_PAYMENT_METHOD,
      payload: data,
  })
  if (typeof window !== "undefined") {
    localStorage.setItem('paymentMethod', JSON.stringify(data))
  }
}