import { BaseApiRequest } from "./base-api";
import { OpResult } from "../helper/operation_result";

class NewsApi extends BaseApiRequest {
  constructor() {
    super(process.env.REACT_APP_API_END_POINT);
  }

  async getCategory() {
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

  async getNewsList(payload) {
    let result = OpResult.failed("getNewsList");
    try {
      let resApi = await this.post("/news/list", payload);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getNewsList", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async getNewsDetail(image_url) {
    let result = OpResult.failed("getNewsDetail");
    try {
      let resApi = await this.get(`/news/show/${image_url}`);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getNewsDetail", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }
}

export const newsApi = new NewsApi();