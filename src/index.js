import React from "react";

import { hydrateRoot, render } from "react-dom";

import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Loadable from 'react-loadable';

import  { HelmetProvider } from 'react-helmet-async';

// vendors
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "antd/dist/antd.min.css";
import "react-toastify/dist/ReactToastify.css";

// styles
import "./styles/style.scss";
import "./styles/style-responsive.scss";

import { Provider } from "react-redux";
import store from "./redux/store";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

// Import React FilePond
import { registerPlugin } from "react-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

import FilePondPluginImageExifOrientation from "filepond-plugin-image-exif-orientation";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview,
  FilePondPluginFileValidateType);

  const rootElement = document.getElementById("root");

  const helmetContext = {};

  const _APP_ = (<React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <ToastContainer />
            <HelmetProvider context={helmetContext}>
              <App />
            </HelmetProvider>
        </BrowserRouter>
      </Provider>
  </React.StrictMode>);

var isMarkupPresent = rootElement.hasChildNodes();

isMarkupPresent ? hydrateRoot(_APP_, rootElement) : render(_APP_, rootElement);

window.onload = () => {
  Loadable.preloadReady().then(() => {
    hydrateRoot(_APP_, rootElement);
  });
};

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
