import * as types from "./types";

const INITIAL_STATE = {
  DesignInfo: {
    design: null,
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    MessageSaveResult: null,
    TitleValidationTheme: null,
    TitleValidationPageUrl: null,
  }

};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_DESIGN_LOADING:
      return {
        ...state,
        design: {
          ...state.design,
        },
        IsOpenSaveToolbar: false,
        IsSaveLoading: false,
        IsOpenSaveResult: false,

      };

    case types.FETCH_DESIGN_COMPLETED:
      debugger;
      return {
        ...state,
        DesignInfo: action.payload
      };

    case types.FETCH_DESIGN_FAILED:
      return {
        ...state,
        DesignInfo: action.payload
      };
    case types.SET_DESIGN:
      debugger;
      return {
        ...state,
        DesignInfo: action.payload
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
    case types.SAVE_DESIGNCOMPLETED:
      debugger;
      return {
        ...state,
        DesignInfo: {
          design: action.payload.design,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.IsSuccess ? 'Your Design is saved successfully.' : action.payload.Message,
        }


      }
    default:
      return state;
  }
};

export default reducer;
