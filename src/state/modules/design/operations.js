import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchDesign = () => {
  return (dispatch, getState) => {
    axios.get(config.rootLink + '/FrontEnd/GetDesign', {
      params: {
        shop: config.shop
      }
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.fetchDesignCompleted(result));
        
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchDesignFailed(errorMsg));
      })

  };
};

export const saveDesign = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    axios.post(config.rootLink + '/FrontEnd/SaveDesign', {
      design: getState().design.DesignInfo.design,
      shop: config.shop
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.saveDesignCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveDesignFailed(errorMsg));
      })

  }
}

export default {
  fetchDesign,
  saveDesign
};
