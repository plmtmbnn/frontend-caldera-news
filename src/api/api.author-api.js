import { BaseApiRequest } from "./base-api";
import { OpResult } from "../helper/operation_result";

class AuthorApi extends BaseApiRequest {
  constructor() {
    super(process.env.REACT_APP_API_END_POINT);
  }

  async getAuthorList() {
    let result = OpResult.failed("getAuthorList");
    try {
      let resApi = await this.get(`/origin-author`);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getAuthorList", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async upsertAuthor(full_name) {
    let result = OpResult.failed("upsertAuthor");
    try {
      let resApi = await this.post(`/origin-author/upsert`, {full_name});
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

export const authorApi = new AuthorApi();