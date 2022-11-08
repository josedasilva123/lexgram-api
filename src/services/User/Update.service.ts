import User from "../../models/user";
import { iUpdateQuery } from "../../routes/Follower/FollowerTypes";

export class UserUpdate {
  async UserUpdate(userQueries: iUpdateQuery[]) {
    userQueries.forEach(async (user) => {
      await User.updateOne({ _id: user.id }, user.set);
    });
  }
}
