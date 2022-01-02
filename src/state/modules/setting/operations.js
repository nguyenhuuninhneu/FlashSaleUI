import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchSetting = () => {
  return (dispatch, getState) => {
    debugger;
    dispatch(actions.fetchSettingLoading());
    axios.get(config.rootLink + '/FrontEnd/GetSetting', {
      params: {
        shop: config.shop
      }
    })
      .then(function (response) {
        debugger;

        const result = response?.data;
        dispatch(actions.fetchSettingCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchSettingFailed(errorMsg));
      })

  };
};

export const saveSetting = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    debugger;
    
    axios.post(config.rootLink + '/FrontEnd/SaveSetting', {
      setting: getState().setting.SettingInfo.setting,
      shop: config.shop
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.saveSettingCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveSettingFailed(errorMsg));
      })

  }
}

export default {
  fetchSetting,
  // createCampaign,
  // saveCampaign
};
