import './App.css';
import './assets/css/App.css';
import React, { useEffect, useState } from 'react';
import config from './config/config';
import Loading from './components/plugins/Loading';
import { appOperations } from "./state/modules/app";
import { campaignOperations } from "./state/modules/campaign";
import { designOperations } from "./state/modules/design";
import { settingOperations } from "./state/modules/setting";
import { useSelector, useDispatch } from "react-redux";
import { Card, Tabs } from '@shopify/polaris';
import { setSelectedTab,setIsNoCampaign } from './state/modules/app/actions';
import NoCampaign from './components/campaign/NoCampaign';
import ListCampaign from './components/campaign/ListCampaign';
import CreateUpdateCampaign from './components/campaign/CreateUpdateCampaign';
import Design from './components/design/Design';
import Setting from './components/setting/Setting';

const tabAll = [
  {
    id: 'campaign',
    content: 'Campaign'
  },
  {
    id: 'design',
    content: 'Design'
  },
  {
    id: 'setting',
    content: 'General Settings'
  },
  {
    id: 'document',
    content: 'Document'
  }
]
const tabNoDesign = [
  {
    id: 'campaign',
    content: 'Campaign'
  },
  {
    id: 'setting',
    content: 'General Settings'
  },
  {
    id: 'document',
    content: 'Document'
  }
]

const AppFrame = () => {
  const dispatch = useDispatch();
  const appState = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(appOperations.fetchShop());
    dispatch(campaignOperations.fetchList());
    dispatch(designOperations.fetchDesign());
    dispatch(settingOperations.fetchSetting());
    dispatch(settingOperations.getThemes());
    
   
  }, [dispatch]);
  const handleResetTab = () => {
    dispatch(setIsNoCampaign({
      ...appState,
      IsNoCampaign : true
  }));
  }
  
  let content = <Loading></Loading>;
  switch (appState.selectedTab) {
    case 0:
      content = appState.IsNoCampaign ? <NoCampaign></NoCampaign> : (appState.IsCreatingCampaign ? <CreateUpdateCampaign></CreateUpdateCampaign> : <ListCampaign handleResetTab={handleResetTab}></ListCampaign>);
      break;
    case 1:
      if (!appState.IsNoCampaign) {
        content = <Design></Design>;
      } else {
        content = <Setting></Setting>;
      }
      break;
    case 2:
      if (!appState.IsNoCampaign) {
        content = <Setting></Setting>;
      }
      break;
    default:
      break;
  }
  return (
    appState.IsLoading ? <Loading></Loading> :
      <Tabs
        tabs={appState.IsNoCampaign ? tabNoDesign: tabAll}
        selected={appState.selectedTab}
        onSelect={(selected) => dispatch(setSelectedTab(selected)) }
      >

        <Card.Section>
          {content}
        </Card.Section>
      </Tabs>
  );

}
export default AppFrame;	