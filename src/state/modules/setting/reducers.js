import * as types from "./types";

const INITIAL_STATE = {
  SettingInfo: {
    setting: null,
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    MessageSaveResult: null,
    TitleValidation: null,
  }


};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SETTING_LOADING:
      return {
        ...state,
        setting: {
          ...state.setting,
        },
        IsOpenSaveToolbar: false,
        IsSaveLoading: false,
        IsOpenSaveResult: false,

      };

    case types.FETCH_SETTING_COMPLETED:
      debugger;
      return {
        ...state,
        SettingInfo: action.payload
      };

    case types.FETCH_SETTING_FAILED:
      return {
        ...state,
        SettingInfo: action.payload
      };
    case types.SET_SETTING:
      debugger;
      return {
        ...state,
        SettingInfo: action.payload
      };

    case types.SET_ISOPENSAVETOOLBAR:
      return {
        ...state,
        IsOpenSaveToolbar: action.payload,
      };
    case types.SET_ISSAVELOADING:
      return {
        ...state,
        IsSaveLoading: action.payload,
      };
    case types.SAVE_SETTINGCOMPLETED:
      debugger;
      return {
        ...state,
        SettingInfo: {
          setting: action.payload.setting,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.IsSuccess ? 'Your Setting is saved successfully.' : action.payload.Message,
        }
      };
    default:
      return state;
  }
};

export default reducer;
