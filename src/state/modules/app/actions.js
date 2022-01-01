import * as types from "./types";

export const fetchShopLoading = () => {
  return {
    type: types.FETCH_SHOP_LOADING,
  };
};

export const fetchShopCompleted = (data) => {
  return {
    type: types.FETCH_SHOP_COMPLETED,
    payload: data,
  };
};

export const fetchShopFailed = (data) => {
  return {
    type: types.FETCH_SHOP_FAILED,
    payload: data,
  };
};

export const setSelectedTab = (data) => {
  return {
    type: types.SET_SELECTED_TAB,
    payload: data,
  };
};
export const setIsNoCampaign = (data) => {
  return {
    type: types.SET_IS_NO_CAMPAIGN,
    payload: data,
  };
};
export const setIsCreatingCampaign = (data) => {
  return {
    type: types.SET_IS_CREATING_CAMPAIGN,
    payload: data,
  };
};
export const clickBtnNoCampaign = (data) => {
  return {
    type: types.CLICK_BUTTON_NO_CAMPAIGN,
    payload: data,
  };
};
