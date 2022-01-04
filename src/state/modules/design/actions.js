import * as types from "./types";

export const fetchDesignLoading = () => {
  return {
    type: types.FETCH_DESIGN_LOADING,
  };
};

export const fetchDesignCompleted = (data) => {
  return {
    type: types.FETCH_DESIGN_COMPLETED,
    payload: data,
  };
};

export const fetchDesignFailed = (data) => {
  return {
    type: types.FETCH_DESIGN_FAILED,
    payload: data,
  };
};

export const setDesign = (data) => {
  return {
    type: types.SET_DESIGN,
    payload: data,
  };
};

export const setIsSaveLoading = (data) => {
  return {
    type: types.SET_ISSAVELOADING,
    payload: data,
  };
};


export const saveDesignCompleted = (data) => {
  return {
    type: types.SAVE_DESIGNCOMPLETED,
    payload: data,
  };
};


export const saveDesignFailed = (data) => {
  return {
    type: types.SAVE_DESIGNFAILED,
    payload: data,
  };
};
