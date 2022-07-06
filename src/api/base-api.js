import axios from "axios";
import { OpResult } from "../helper/operation_result";

class BaseApiRequest {
  constructor(endpoint) {
    this.endpoint = 'https://backend-caldera-news.herokuapp.com';
    this.token = "token";
    this.config = undefined;
    this.init();
  }

  init() {
    const store = localStorage.getItem("_CALDERA_");
    if (store) {
        this.setConfig(store.token);
    }
  }

  setConfig(token) {
    this.token = token;
    this.config = {
      headers: { authorization: token },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
      validateStatus: function () {
        return true;
      },
    };
  }

  async get(uri) {
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

  async post(route, req_body) {
    try {
      if (this.token) {
        axios.defaults.validateStatus = function () {
          return true;
        };
        let response = await axios.post(
          this.endpoint + route,
          req_body,
          this.config
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
