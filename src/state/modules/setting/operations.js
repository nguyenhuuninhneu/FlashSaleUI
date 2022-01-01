import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchSetting = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchSettingLoading());
    axios.get(config.rootLink + '/FrontEnd/GetSetting', {
      params: {
        shop: config.shop
      }
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.fetchSettingCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchSettingFailed(errorMsg));
      })

  };
};

// export const createCampaign = () => {
//   return (dispatch, getState) => {
//     dispatch(actions.setCreateUpdateCampaign(
//       {
//         ...getState().campaign.CreateUpdateCampaign,
//         campaign:
//         {
//           ID: 0,
//           Title: '',
//           StartTime: '',
//           EndTime: '',
//           TotalProduct: '',
//           ShopID: getState().app.Shop?.ID,
//           Status: true,
//           ListDetails: [],
//           StartTimeStr: '',
//           EndTimeStr: '',
//         }
//       }));
//   }
// }

// export const editCampaign = (campaign) => {
//   return (dispatch, getState) => {
//     dispatch(actions.setCreateUpdateCampaign(
//       {
//         ...getState().campaign.CreateUpdateCampaign,
//         campaign: campaign
//       }));
//   }
// }

export const saveSetting = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());

    axios.post(config.rootLink + '/FrontEnd/SaveSetting', {
      design: getState().Setting,
      shop: config.shop
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.saveSettingCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveSettingFailed(errorMsg));
      })

  }
}

export default {
  fetchSetting,
  // createCampaign,
  // saveCampaign
};
