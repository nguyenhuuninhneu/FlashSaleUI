import axios from "axios";
import config from "../../../config/config";
import * as actions from "./actions";

export const fetchList = () => {
  return (dispatch, getState) => {
    dispatch(actions.fetchListLoading());

    axios.get(config.rootLink + '/FrontEnd/GetCampaigns', {
      params: {
        shop: config.shop
      }
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.fetchListCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.fetchListFailed(errorMsg));
      })

  };
};

export const createCampaign = () => {
  return (dispatch, getState) => {
    dispatch(actions.setCreateUpdateCampaign(
      {
        ...getState().campaign.CreateUpdateCampaign,
        campaign:
        {
          ID: 0,
          Title: '',
          StartTime: '',
          EndTime: '',
          TotalProduct: '',
          ShopID: getState().app.Shop?.ID,
          Status: true,
          ListDetails: [],
          StartTimeStr: '',
          EndTimeStr: '',
        }
      }));
  }
}

export const editCampaign = (campaign) => {
  return (dispatch, getState) => {
    dispatch(actions.setCreateUpdateCampaign(
      {
        ...getState().campaign.CreateUpdateCampaign,
        campaign: campaign
      }));
  }
}

export const saveCampaign = () => {
  return (dispatch, getState) => {
    dispatch(actions.setIsSaveLoading());

    axios.post(config.rootLink + '/FrontEnd/SaveCampaign', {
      campaign: getState().campaign.CreateUpdateCampaign.campaign,
      shop: config.shop
    })
      .then(function (response) {
        const result = response?.data;
        dispatch(actions.saveCampaignCompleted(result));
      })
      .catch(function (error) {
        const errorMsg = error.message;
        dispatch(actions.saveCampaignFailed(errorMsg));
      })

  }
}

export default {
  fetchList,
  createCampaign,
  saveCampaign
};
