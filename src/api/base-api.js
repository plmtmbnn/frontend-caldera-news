import axios from "axios";
import { OpResult } from "../helper/operation_result";

class BaseApiRequest {
  constructor(endpoint) {
    this.endpoint = this.handleEntpoint(endpoint);
    // this.endpoint = 'http://localhost:8081';

    this.token = "token";
    this.config = undefined;
    this.init();
  }

  handleEntpoint(endpoint) {
    let result = 'https://backend-caldera-news.herokuapp.com';

    if(endpoint){
      result = endpoint;
    }
    return result;
  }

  init() {
    let store = localStorage.getItem("_CALDERA_");
    if (store) {
        store = JSON.parse(store);
        this.setConfig(store.token);
    } else {
      this.setConfig('xxx');
    }
  }

  setConfig(token) {
    this.token = token;
    this.config = {
      headers: { 
        withCredentials: false,
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, OPTIONS',
        authorization: token
       },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      validateStatus: function () {
        return true;
      },
    };
  }

  async get(uri) {
    this.init();
    try {
      if (this.token) {
        let response = await axios.get(this.endpoint + uri, this.config);

        if (response.status >= 400 && response.status < 500) {
          if (response.status === 401) {
            // this.resetLocalStorageAndRedirectToLoginPage();
          }
          let resp = response.data
            ? response.data
            : OpResult.failed(response.statusText);
          resp.code = response.status;
          return resp;
        } else {
          return response.data;
        }
      }
    } catch (error) {
      console.log("[API_GET]", error);
      return OpResult.failed(`request failed`);
    }
  }

  async post(route, req_body, isFormData) {
    this.init();
    try {
      if (this.token) {
        axios.defaults.validateStatus = function () {
          return true;
        };
        let response = await axios.post(
          this.endpoint + route,
          req_body,
          {
             ...this.config,
             headers: {
              ...this.config.headers,
              "Content-Type": isFormData ? "multipart/form-data" : "application/json"
             }
          }
        );
        if (response.status >= 400 && response.status < 500) {
          if (response.status === 401) {
            // this.resetLocalStorageAndRedirectToLoginPage();
          }
          let resp = response.data
            ? response.data
            : OpResult.failed(response.statusText);
          resp.code = response.status;
          return resp;
        } else {
          return response.data;
        }
      }
    } catch (error) {
      console.log("[API_POST] ", error);
      return OpResult.failed(`request failed`);
    }
  }

  async downloadWithPost(route, payload, document_name) {
    this.init();
    try {
      const config = { ...this.config, responseType: "blob" };
      if (this.token) {
        let response = await axios.post(this.endpoint + route, payload, config);
        if (response.status >= 400 && response.status <= 500) {
          if (response.status === 401) {
            // this.resetLocalStorageAndRedirect();
          }
          let resp = response.data
            ? response.data
            : OpResult.failed(response.statusText);
          resp.code = response.status;
          return resp;
        } else {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          let link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", document_name + ".pdf");
          document.body.appendChild(link);
          link.click();
          return true;
        }
      }
    } catch (error) {
      return OpResult.failed(`request failed`);
    }
  }
}

export { BaseApiRequest };
