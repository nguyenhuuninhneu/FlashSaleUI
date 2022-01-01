import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchShop = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchShopLoading());

    axios.get(config.rootLink + '/FrontEnd/GetShop', {
      params: {
        shop: config.shop
      }
    })
    .then(function (response) {
      const result = response?.data;
      dispatch(actions.fetchShopCompleted(result));
      if (response.data.hasPlan) {
        window.open(response.data.confirmUrl, "_blank");
      }
    })
    .catch(function (error) {
      const errorMsg = error.message;
      dispatch(actions.fetchShopFailed(errorMsg));
    })
   
  };
};

export default {
  fetchShop
};
