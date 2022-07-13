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
}

export const authApi = new AuthApi();