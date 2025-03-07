import axios from 'axios';
import { toast } from 'react-toastify';

export const GET_PRODUCT_LIST = 'GET_PRODUCT_LIST';
export const GET_CART_LIST = 'GET_CART_LIST';
export const GET_CATEGORY_LIST = 'GET_CATEGORY_LIST';
export const GET_RATING_LIST = 'GET_RATING_LIST';
export const GET_BRAND_LIST = 'GET_BRAND_LIST';

export const ADD_PRODUCT_TO_CART = 'ADD_PRODUCT_TO_CART';
export const DELETE_PRODUCT_FROM_CART = 'DELETE_PRODUCT_FROM_CART';

export const UPDATE_CART_AMOUNT = 'UPDATE_CART_AMOUNT';
export const GET_ALL_USERS = 'GET_ALL_USERS';
export const GET_ALL_SHIFTS = 'GET_ALL_SHIFTS';
export const POST_SHIFTS = 'POST_SHIFTS';

export const getProductList = () => (dispatch) => {
  axios.get('/api/ecommerce/get-product-list').then((res) => {
    dispatch({
      type: GET_PRODUCT_LIST,
      payload: res.data,
    });
  });
};

export const getCategoryList = () => (dispatch) => {
  axios.get('/api/ecommerce/get-category-list').then((res) => {
    dispatch({
      type: GET_CATEGORY_LIST,
      payload: res.data,
    });
  });
};

export const getRatingList = () => (dispatch) => {
  axios.get('/api/ecommerce/get-rating-list').then((res) => {
    dispatch({
      type: GET_RATING_LIST,
      payload: res.data,
    });
  });
};

export const getBrandList = () => (dispatch) => {
  axios.get('/api/ecommerce/get-brand-list').then((res) => {
    dispatch({
      type: GET_BRAND_LIST,
      payload: res.data,
    });
  });
};

export const getCartList = (uid) => (dispatch) => {
  axios.get('/api/ecommerce/get-cart-list', { data: uid }).then((res) => {
    dispatch({
      type: GET_CART_LIST,
      payload: res.data,
    });
  });
};

export const addProductToCart = (uid, productId) => (dispatch) => {
  axios.post('/api/ecommerce/add-to-cart', { uid, productId }).then((res) => {
    console.log(res.data);
    dispatch({
      type: ADD_PRODUCT_TO_CART,
      payload: res.data,
    });
  });
};

export const deleteProductFromCart = (uid, productId) => (dispatch) => {
  axios.post('/api/ecommerce/delete-from-cart', { uid, productId }).then((res) => {
    dispatch({
      type: DELETE_PRODUCT_FROM_CART,
      payload: res.data,
    });
  });
};

export const updateCartAmount = (uid, productId, amount) => (dispatch) => {
  console.log(uid, productId, amount);
  axios.post('/api/ecommerce/update-cart-amount', { uid, productId, amount }).then((res) => {
    dispatch({
      type: UPDATE_CART_AMOUNT,
      payload: res.data,
    });
  });
};

export const getAllUsers = () => (dispatch) => {
  // console.log(uid, productId, amount);
  axios.get('http://server.appsstaging.com:3055/api/getAllUsers').then((res) => {
    // console.log("sss",res.data)
    dispatch({
      type: GET_ALL_USERS,
      payload: res.data.users,
    });
  });
};

export const getShifts = () => (dispatch) => {
  // console.log(uid, productId, amount);

  const accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    const config = {
      headers: { Authorization: 'Bearer ' + accessToken },
    };

    axios.get('http://server.appsstaging.com:3055/api/getShifts', config).then((res) => {
      // console.log('sss', res.data.shifts);

      const shift = res.data.shifts;
      dispatch({
        type: GET_ALL_SHIFTS,
        payload: shift,
      });
    });
  }
};

export const addShift = (state) => async (dispatch) => {
  // console.log(uid, productId, amount);

  const accessToken = window.localStorage.getItem('accessToken');
  if (accessToken) {
    const config = {
      headers: { Authorization: 'Bearer ' + accessToken },
    };

    await axios
      .post('http://server.appsstaging.com:3055/api/addShift', state, config)
      .then((res) => {
        console.log('ressssssssssssss', res);
        toast.success(res.data.message);
        // console.log('sss', res.data.allshifts);
        dispatch({
          type: 'MESSAGE',
          payload: res.data.message,
        });
      })
      .catch((err) => {
        console.log(err.response);
        toast.error(err.response.data.message);
      });
  }
};
