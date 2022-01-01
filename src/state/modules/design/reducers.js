import * as types from "./types";

const INITIAL_STATE = {
  Design: {
    LayoutType: 0,
    ProductColor: "#EE4D2D",
    ProductIcon: "/Content/ProductIcon.png",
    ProductImage: "/Content/ProductImage.png",
    ProductNumberInRow: 4,
    ProductShowProgressBarStatus: true,
    TextAlmostSoldOut: "Almost sold out",
    TextJustSale: "Just Sale",
    TextSold: "Sold",
    TimerCountDownBackground: "#EE4D2D",
    TimerCountDownColor: "#EE4D2D",
    TimerCountDownStatus: true
  },
  isLoading: false
  // CreateUpdateCampaign: {
  //   InventoryBulkUpdate: null,
  //   DiscountBulkUpdate: null,
  //   campaign: null,
  //   IsOpenSaveToolbar: false,
  //   IsSaveLoading: false,
  //   IsOpenSaveResult: false,
  //   MessageSaveResult: null,
  //   TitleValidation: null,
  //   StartTimeValidation: null,
  //   EndTimeValidation: null,
  //   ProductValidation: null,
  //   TextSearchProduct: null
  // }


};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_DESIGN_LOADING:
      return {
        ...state,
        Design: {
          ...state.Design,
        },
        IsOpenSaveToolbar: false,
        IsSaveLoading: false,
        IsOpenSaveResult: false,
        designLoading: true,

      };

    case types.FETCH_DESIGN_COMPLETED:
      return {
        ...state,
        Design: {
          ...state.Design = action.payload.Design
        },
        designLoading: false,


      };

    case types.FETCH_DESIGN_FAILED:
      return {
        ...state,
        Design: action.payload,
        designLoading: false,
      };
    case types.SET_DESIGN:
      debugger;
      return {
        ...state,
        Design: action.payload
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
      return {
        ...state,
        Design: state.Design,
        // IsOpenSaveToolbar: !action.payload.IsSuccess,
        // IsSaveLoading: false,
        // IsOpenSaveResult: true,
        // MessageSaveResult: action.payload.IsSuccess ? 'Your Design is saved successfully.' : action.payload.Message,
      };
    default:
      return state;
  }
};

export default reducer;
