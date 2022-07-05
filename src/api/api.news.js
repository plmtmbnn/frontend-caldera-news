import { BaseApiRequest } from "./base-api";
import { OpResult } from "../helper/operation_result";

class NewsApi extends BaseApiRequest {
  constructor() {
    super(process.env.REACT_APP_API_END_POINT);
  }

  async getCategory(payload) {
    let result = OpResult.failed("getCategory");
    try {
      let resApi = await this.get("/category");
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getCategory", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }
}

export const newsApi = new NewsApi();