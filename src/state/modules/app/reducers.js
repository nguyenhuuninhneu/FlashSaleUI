import * as types from "./types";

const INITIAL_STATE = {
  Shop: null,
  Setting: null,
  Design: null,
  IsLoading: false,
  selectedTab: 0,
  IsNoCampaign: false,
  IsCreatingCampaign: false
};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return {
        ...state,
        IsLoading: action.payload,
      };
    case types.FETCH_SHOP_LOADING:
      return {
        ...state,
        IsLoading: true,
      };
    case types.FETCH_SHOP_FAILED:
      return {
        ...state,
        IsLoading: false,
      };
    case types.FETCH_SHOP_COMPLETED:
      return {
        ...state,
        IsLoading: false,
        Shop: action.payload.shop,
        Setting: action.payload.setting,
        Design: action.payload.design,
        IsNoCampaign: !action.payload.hasCampaign
      };
    case types.SET_SELECTED_TAB:
      return {
        ...state,
        selectedTab: action.payload,
      };
    case types.SET_IS_NO_CAMPAIGN:
      return {
        ...state,
        IsNoCampaign: action.payload,
      };
    case types.SET_IS_CREATING_CAMPAIGN:
      return {
        ...state,
        IsCreatingCampaign: action.payload,
      };
    case types.CLICK_BUTTON_NO_CAMPAIGN:
      return {
        ...state,
        IsNoCampaign: false,
        IsCreatingCampaign: true,
      }; 
    default:
      return state;
  }
};

export default reducer;
