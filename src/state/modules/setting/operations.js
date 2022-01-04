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

export const getThemes = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    debugger;
    
    axios.get(config.rootLink + '/FrontEnd/GetThemes', {
      shop: config.shop
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.getThemes(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.getThemes(errorMsg));
      })

  }
}

export const createSection = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    debugger;
    
    axios.get(config.rootLink + '/FrontEnd/CreateSection', {
      shop: config.shop,
      id: 1
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.createSectionCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.createSectionCompleted(errorMsg));
      })

  }
}

export const removeSection = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    debugger;
    
    axios.get(config.rootLink + '/FrontEnd/RemoveSection', {
      shop: config.shop,
      id: 1
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.removeSectionCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.removeSectionCompleted(errorMsg));
      })

  }
}

export const createFlashSalePage = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    debugger;
    
    axios.get(config.rootLink + '/FrontEnd/CreateFlashSalePage', {
      shop: config.shop,
      title: getState().SettingInfo.setting.PageTitle,
      createdAt: getState().SettingInfo.setting.PageCreatedDate,
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.getThemes(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.getThemes(errorMsg));
      })

  }
}

export default {
  fetchSetting,
  saveSetting,
  getThemes,
  createSection,
  removeSection,
  createFlashSalePage
};
