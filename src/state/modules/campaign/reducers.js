import * as types from "./types";

const INITIAL_STATE = {
  ListCampaign: {
    campaigns: null,
    listLoading: false
  },
  CreateUpdateCampaign: {
    InventoryBulkUpdate: null,
    DiscountBulkUpdate: null,
    campaign: null,
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    MessageSaveResult: null,
    TitleValidation: null,
    StartTimeValidation: null,
    EndTimeValidation: null,
    ProductValidation: null,
    TextSearchProduct: null
  }


};


const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCH_LIST_LOADING:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: true,
        }
      };

    case types.FETCH_LIST_COMPLETED:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: false,
          campaigns: action.payload.list
        }

      };

    case types.FETCH_LIST_FAILED:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: false,
          listFailed: action.payload,
        }

      };
    case types.SET_CREATEUPDATECAMPAIGN:
      return {
        ...state,
        CreateUpdateCampaign: action.payload
      };
    case types.SET_LISTCAMPAIGN:
      return {
        ...state,
        ListCampaign: action.payload
      };
    case types.SET_ISOPENSAVETOOLBAR:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsOpenSaveToolbar: action.payload,
        }
      };
    case types.SET_ISSAVELOADING:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsSaveLoading: action.payload,
        }
      };
    case types.SAVE_CAMPAIGNCOMPLETED:
      return {
        ...state,
        ListCampaign: {
          ...state.ListCampaign,
          listLoading: false,
          campaigns: [action.payload.campaign]
        },
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.IsSuccess ? 'Your campaign is saved successfully.' : action.payload.Message,
          campaign: {
            ...state.CreateUpdateCampaign.campaign,
            ID: action.payload.IsSuccess ? action.payload.campaign.ID : state.CreateUpdateCampaign.campaign.ID
          }
        }
      };
    case types.SAVE_CAMPAIGNCOMPLETED:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          IsOpenSaveToolbar: true,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload
        }
      };
    case types.SET_TITLEVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          TitleValidation: action.payload
        }
      }
    case types.SET_STARTTIMEVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          StartTimeValidation: action.payload
        }
      }
    case types.SET_ENDTIMEVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          EndTimeValidation: action.payload
        }
      }
    case types.SET_PRODUCTVALIDATION:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          ProductValidation: action.payload
        }
      }
    case types.SET_TEXTSEARCHPRODUCT:
      return {
        ...state,
        CreateUpdateCampaign: {
          ...state.CreateUpdateCampaign,
          TextSearchProduct: action.payload
        }
      }
    default:
      return state;
  }
};

export default reducer;
