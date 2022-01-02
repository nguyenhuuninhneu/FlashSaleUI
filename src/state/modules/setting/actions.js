import * as types from "./types";

export const fetchSettingLoading = () => {
  return {
    type: types.FETCH_SETTING_LOADING,
  };
};

export const fetchSettingCompleted = (data) => {
  debugger;
  return {
    type: types.FETCH_SETTING_COMPLETED,
    payload: data,
  };
};

export const fetchSettingFailed = (data) => {
  return {
    type: types.FETCH_SETTING_FAILED,
    payload: data,
  };
};

export const setSetting = (data) => {
  debugger;
  return {
    type: types.SET_SETTING,
    payload: data,
  };
};

export const setIsSaveLoading = (data) => {
  return {
    type: types.SET_ISSAVELOADING,
    payload: data,
  };
};

export const saveSettingCompleted = (data) => {
  return {
    type: types.SAVE_SETTINGCOMPLETED,
    payload: data,
  };
};


export const saveSettingFailed = (data) => {
  return {
    type: types.SAVE_SETTINGFAILED,
    payload: data,
  };
};
