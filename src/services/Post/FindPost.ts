import Post from "../../models/post";
import { nextPage } from "../../functions/utils/pagination";
import { iPostGetQuery } from "../../routes/Post/PostTypes";

export class PostFindPosts {
  async FindPosts(query: any, { user, page, perPage }: iPostGetQuery) {
    if (user && page && perPage) {
      const count = await Post.find(query).count();

      const skip = Number(page) * Number(perPage);

      const next = nextPage("", count, user, page, perPage);

      const posts = await Post.find(query).skip(skip).limit(Number(perPage));

      return { count, next, posts };
    }
  }
}
