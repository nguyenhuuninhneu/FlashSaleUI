import * as types from "./types";
import moreAppConfig from "../../../config/moreAppConfig";

const INITIAL_STATE = {
  SettingInfo: {
    setting: null,
    IsOpenSaveToolbar: false,
    IsSaveLoading: false,
    IsOpenSaveResult: false,
    MessageSaveResult: null,
    TitleValidation: null,
    ListThemes: null,
    IsShowLoadingCreateSection: false,
    IsShowLoadingEnableApp: false,
    IsShowLoadingCreateFSPage: false,
    IsShowLoadingSettingComponent: true,
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
      var listSection = [];
      if (action.payload.IsSuccess && action.payload.setting != null && action.payload.setting != undefined && action.payload.setting.ListCreateSectionInTheme != null) {
        listSection = JSON.parse(action.payload.setting.ListCreateSectionInTheme);
      }
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          setting: {
            ...action.payload.setting,
            ListSections: (action.payload.IsSuccess ? listSection : state.SettingInfo.setting.ListSections)
          },
          IsOpenSaveToolbar: !action.payload.IsSuccess,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          IsShowLoadingEnableApp: false,
          MessageSaveResult: action.payload.IsSuccess ? 'Your Setting is saved successfully.' : action.payload.Messenger,
        }
      };
    case types.SAVE_SETTINGFAILED:
      
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          IsOpenSaveToolbar: false,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          IsShowLoadingEnableApp: false,
          MessageSaveResult: action.payload.Messenger,
        }
      };
    case types.GET_THEME:
      
      return {
        ...state,
        SettingInfo: {
          ListThemes: action.payload
        }
      };
    case types.CREATE_SECTION:
      var listSection = [];
      if (action.payload.isSuccess && action.payload.setting != null && action.payload.setting != undefined) {
        listSection = JSON.parse(action.payload.setting.ListCreateSectionInTheme);
      }
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          setting: {
            ...state.SettingInfo.setting,
            ListSections: (action.payload.isSuccess ? listSection : state.SettingInfo.setting.ListSections)
            
          },
          IsShowLoadingCreateSection: false,
          IsSaveLoading: false,
          TitleValidationTheme: action.payload.isSuccess ? '' : moreAppConfig.SettingValidationExistTheme,
          IsOpenSaveResult: action.payload.isSuccess ? true : false,
          MessageSaveResult: action.payload.isSuccess ? 'Section is created successfully.' : action.payload.message,
        }
      };
    case types.CREATE_SECTION_FAILED:
      
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          IsShowLoadingCreateSection: false,
          // IsShowLoadingCreateFSPage: !action.payload.isSuccess,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.isSuccess ? 'Create flash sale page is successfully.' : action.payload.message,
        }
      };
    case types.REMOVE_SECTION:
      
      var listSection = [];
      if (action.payload.isSuccess && action.payload.setting != null && action.payload.setting != undefined) {
        listSection = JSON.parse(action.payload.setting.ListCreateSectionInTheme);
      }
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          setting: {
            ...state.SettingInfo.setting,
            ListSections: (action.payload.isSuccess ? listSection: state.SettingInfo.setting.ListSections)
          },
          TitleValidationTheme: '',
          IsShowLoadingCreateSection: false,
          IsOpenSaveToolbar: !action.payload.isSuccess,
          IsSaveLoading: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.isSuccess ? 'Section is removed successfully.' : action.payload.message,
        }
      };
    case types.REMOVE_SECTION_FAILED:
      
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          IsShowLoadingCreateSection: false,
          // IsShowLoadingCreateFSPage: !action.payload.isSuccess,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.isSuccess ? 'Create flash sale page is successfully.' : action.payload.message,
        }
      };
    case types.CREATE_FLASHSALE_PAGE:
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          IsShowLoadingCreateFSPage: !action.payload.isSuccess,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.isSuccess ? 'Create flash sale page is successfully.' : action.payload.message,
          setting: {
            ...state.SettingInfo.setting,
            PageUrl: action.payload.pageLink,
            PageCreatedDate: action.payload.createdDate,
            PageCreatedDateStr: action.payload.createdDateStr,
          },
          
        }
      };
    case types.CREATE_FLASHSALE_PAGE_FAILED:
      
      return {
        ...state,
        SettingInfo: {
          ...state.SettingInfo,
          IsShowLoadingCreateFSPage: false,
          IsOpenSaveResult: true,
          MessageSaveResult: action.payload.message,
        }
      };
    default:
      return state;
  }
};

export default reducer;
