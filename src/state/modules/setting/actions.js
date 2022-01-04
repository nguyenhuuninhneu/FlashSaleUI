import * as types from "./types";

export const fetchSettingLoading = () => {
  return {
    type: types.FETCH_SETTING_LOADING,
  };
};

export const fetchSettingCompleted = (data) => {
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

export const getThemes = (data) => {
  return {
    type: types.GET_THEME,
    payload: data,
  };
};

export const createSectionCompleted = (data) => {
  return {
    type: types.CREATE_SECTION,
    payload: data,
  };
};
export const createSectionFailed = (data) => {
  return {
    type: types.CREATE_SECTION_FAILED,
    payload: data,
  };
};
export const removeSectionCompleted = (data) => {
  return {
    type: types.REMOVE_SECTION,
    payload: data,
  };
};

export const removeSectionFailed = (data) => {
  return {
    type: types.REMOVE_SECTION_FAILED,
    payload: data,
  };
};
export const createFlashSalePageCompleted = (data) => {
  return {
    type: types.CREATE_FLASHSALE_PAGE,
    payload: data,
  };
};

export const createFlashSalePageFailed = (data) => {
  return {
    type: types.CREATE_FLASHSALE_PAGE_FAILED,
    payload: data,
  };
};