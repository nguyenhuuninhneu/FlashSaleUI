import * as types from "./types";

export const fetchListLoading = () => {
  return {
    type: types.FETCH_LIST_LOADING,
  };
};

export const fetchListCompleted = (data) => {
  return {
    type: types.FETCH_LIST_COMPLETED,
    payload: data,
  };
};

export const fetchListFailed = (data) => {
  return {
    type: types.FETCH_LIST_FAILED,
    payload: data,
  };
};

export const setListCampaign = (data) => {
  return {
    type: types.SET_LISTCAMPAIGN,
    payload: data,
  };
};

export const setCreateUpdateCampaign = (data) => {
  return {
    type: types.SET_CREATEUPDATECAMPAIGN,
    payload: data,
  };
};

export const setIsSaveLoading = (data) => {
  return {
    type: types.SET_ISSAVELOADING,
    payload: data,
  };
};


export const saveCampaignCompleted = (data) => {
  return {
    type: types.SAVE_CAMPAIGNCOMPLETED,
    payload: data,
  };
};


export const saveCampaignFailed = (data) => {
  return {
    type: types.SAVE_CAMPAIGNFAILED,
    payload: data,
  };
};