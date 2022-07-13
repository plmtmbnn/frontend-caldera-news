import { BaseApiRequest } from "./base-api";
import { OpResult } from "../helper/operation_result";

class CommentLikeApi extends BaseApiRequest {
  constructor() {
    super(process.env.REACT_APP_API_END_POINT);
  }

  async getCommentList(news_id) {
    let result = OpResult.failed("getCommentList");
    try {
      let resApi = await this.get(`/news/comment/get/${news_id}`);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getCommentList", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async addComment(payload) {
    let result = OpResult.failed("addComment");
    try {
      let resApi = await this.post(`/news/comment/upsert`, payload);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("addComment", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async getLikeList(news_id) {
    let result = OpResult.failed("getLikeList");
    try {
      let resApi = await this.get(`/news/like/get/${news_id}`);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("getLikeList", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }

  async addLike(payload) {
    let result = OpResult.failed("addLike");
    try {
      let resApi = await this.post(`/news/like/upsert`, payload);
      if (resApi.status) {
        result = resApi;
      }
    } catch (e) {
      console.log("addLike", e);
      result = OpResult.failed("Internal Error");
    }
    return result;
  }
}

export const commentLikeApi = new CommentLikeApi();