import { BaseApiRequest } from "./base-api";
import { OpResult } from "../helper/operation_result";

class TagApi extends BaseApiRequest {
  constructor() {
    super(process.env.REACT_APP_API_END_POINT);
  }

  async getTag() {
    let result = OpResult.failed("getAuthorList");
    try {
      let resApi = await this.get(`/tag`);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getAuthorList", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async upsertTag(name) {
    let result = OpResult.failed("upsertAuthor");
    try {
      let resApi = await this.post(`/tag/upsert`, {name});
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("upsertAuthor", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }
}

export const tagApi = new TagApi();