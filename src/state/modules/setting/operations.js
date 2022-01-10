import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchSetting = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchSettingLoading());
    axios.get(config.rootLink + '/FrontEnd/GetSetting', {
      params: {
        shop: config.shop
      }
    })
      .then(function (response) {
        const result = response?.data;
        var listSection = [];
        if (result.setting.ListCreateSectionInTheme != null && result.setting.ListCreateSectionInTheme != '' && result.setting.ListCreateSectionInTheme != undefined) {
          listSection = JSON.parse(result.setting.ListCreateSectionInTheme);
        }
        result.setting.ListSections = listSection;
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
    dispatch(actions.setSetting({
      ...getState().setting.SettingInfo,
      IsShowLoadingEnableApp: true
    }));
    

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
    axios.get(config.rootLink + '/FrontEnd/GetThemes', {
      params: {
        shop: config.shop
      }
    })
      .then(function (response) {
        debugger;
        const result = response?.data?.themes;
        dispatch(actions.setSetting({
          ...getState().setting.SettingInfo,
          IsShowLoadingSettingComponent: false,
          ListThemes: result
        }));
      })
      .catch(function (error) {
        dispatch(actions.setSetting({
          ...getState().setting.SettingInfo,
          IsShowLoadingSettingComponent: false,
          ListThemes: []
        }));
      })

  }
}

export const createSection = (id,name, createdAt) => {
  return (dispatch, getState) => {
    debugger
    var params = {
      shop: config.shop,
      id: id,
      name: name,
      createdAt: createdAt
    }
    axios.get(config.rootLink + '/FrontEnd/CreateSection', { params: params })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.createSectionCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.createSectionFailed(errorMsg));
      })

  }
}

export const removeSection = (id) => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());
    
    var params =  {
      shop: config.shop,
      id: id
    };
    axios.get(config.rootLink + '/FrontEnd/RemoveSection', { params: params })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.removeSectionCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.removeSectionFailed(errorMsg));
      })

  }
}

export const createFlashSalePage = (createdAt) => {
  return (dispatch, getState) => {
    
    var param = {
      shop: config.shop,
      title: getState().setting.SettingInfo.setting.PageTitle,
      createdAt: createdAt
    }
    axios.get(config.rootLink + '/FrontEnd/CreateFlashSalePage', { params: param })
      .then(function (response) {
        
        const result = response?.data;
        dispatch(actions.createFlashSalePageCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.createFlashSalePageFailed(errorMsg));
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
