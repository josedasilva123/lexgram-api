import User from "../../models/user";
import { ObjectId } from "mongodb";
import { PostFindPosts } from "./FindPost";
import { iPostGetQuery } from "../../routes/Post/PostTypes";
import { iUser, iFollower } from "../../routes/User/UserTypes";

export class PostGetFollowersPosts extends PostFindPosts {
  async execute(query: iPostGetQuery) {
    const { user, page, perPage } = query;

    if (!user || !page || !perPage) {
      throw new Error(
        "Parece que algum parâmetro obrigatório da query está faltando."
      );
    }

    const objectUserID = new ObjectId(String(user));

    const currentUser = (await User.findOne({ _id: objectUserID })) as iUser;

    if (!currentUser) {
      throw new Error("O usuário fornecido é inválido!");
    }

    const followersID = currentUser.followers
      ? currentUser.followers.map((follower: iFollower) => {
          return follower.userID;
        })
      : [];

    const dbQuery = {
      userID: { $in: [...followersID] },
    };

    const postPage = this.FindPosts(dbQuery, query);

    return postPage;
  } 
}
