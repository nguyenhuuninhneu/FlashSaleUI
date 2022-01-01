import './App.css';
import './assets/css/App.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import React from 'react';
import config from './config/config';
import Loading from './components/plugins/Loading';
import { Provider } from "react-redux";
import store from "./state/store";
import { AppProvider } from '@shopify/polaris';
import { Provider as ProviderAppBridge } from "@shopify/app-bridge-react";
import AppFrame from './AppFrame';

const App = () => {
  const configApp = {
    apiKey: config.apiKey,
    shopOrigin: config.shop,
    forceRedirect: false,
  };
  return (
    <Provider store={store}> 
      <AppProvider>
        <ProviderAppBridge config={configApp}>
          <AppFrame />
        </ProviderAppBridge>
      </AppProvider>
    </Provider>
  );

}
export default App;