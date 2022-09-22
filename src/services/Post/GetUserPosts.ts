import { PostFindPosts } from "./FindPost";
import { iPostGetQuery } from "../../routes/Post/PostTypes";

export class PostGetUserPosts extends PostFindPosts {
  async execute(query: iPostGetQuery) {
    const { user, page, perPage } = query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

    const dbQuery = {
      userID: user,
    };

    const postPage = this.FindPosts(dbQuery, query);

    return postPage;
  }
}
