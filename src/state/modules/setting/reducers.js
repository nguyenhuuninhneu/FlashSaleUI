import * as types from "./types";

const INITIAL_STATE = {
  Setting: {
    Active: true,
    IsMonthly: null,
    ListCreateSectionInTheme: null,
    PageCreatedDate: null,
    PageTitle: null,
    PageUrl: null,
    PlanNumber: 2,
    TimeZone: null,
  },
  isLoading: false


};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_SETTING_LOADING:
      return {
        ...state,
        Setting: {
          ...state.Setting,
        },
        IsOpenSaveToolbar: false,
        IsSaveLoading: false,
        IsOpenSaveResult: false,
        designLoading: true,

      };

    case types.FETCH_SETTING_COMPLETED:
      return {
        ...state,
        Setting: {
          ...state.Setting = action.payload.Setting
        },
        designLoading: false,


      };

    case types.FETCH_SETTING_FAILED:
      return {
        ...state,
        Setting: action.payload,
        designLoading: false,
      };
    case types.SET_SETTING:
      debugger;
      return {
        ...state,
        Setting: action.payload
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
      return {
        ...state,
        Setting: state.Setting,
        // IsOpenSaveToolbar: !action.payload.IsSuccess,
        // IsSaveLoading: false,
        // IsOpenSaveResult: true,
        // MessageSaveResult: action.payload.IsSuccess ? 'Your Setting is saved successfully.' : action.payload.Message,
      };
    default:
      return state;
  }
};

export default reducer;
