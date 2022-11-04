import { BaseApiRequest } from "./base-api";
import { OpResult } from "../helper/operation_result";

class AuthApi extends BaseApiRequest {
  constructor() {
    super(process.env.REACT_APP_API_END_POINT);
  }

  async login(payload) {
    let result = OpResult.failed("login");
    try {
      let resApi = await this.post("/auth/login", payload);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("login", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async register(payload) {
    let result = OpResult.failed("register");
    try {
      let resApi = await this.post("/auth/register", payload, true);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("register", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async userList(payload) {
    let result = OpResult.failed("userList");
    try {
      let resApi = await this.post("/auth/user/list", payload);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("userList", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async updateUserStatus(action, user_id) {
    let result = OpResult.failed("updateUserStatus");
    try {
      let resApi = await this.post(`/auth/user/update`, { action, user_id });
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("updateUserStatus", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async updatePassword(payload) {
    let result = OpResult.failed("updatePassword");
    try {
      let resApi = await this.post("/auth/password/update", payload);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("updatePassword", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }
}

export const authApi = new AuthApi();