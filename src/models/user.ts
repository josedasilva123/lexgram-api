import { Schema, model } from "mongoose";
import { User, Notifications, Follower } from "../interfaces/user";

const userSchema = new Schema<User>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    slug: { type: String, required: true },
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: true },
    profileImage: String,
    profileBio: String,
    notifications: Array<Notifications>,
    follow: Array<Follower>,
    followers: Array<Follower>,
  });

const User = model<User>("User", userSchema);

export default User;