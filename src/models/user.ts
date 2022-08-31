import { Schema, model } from "mongoose";
import { iNotification, iFollower, iUser } from "../interfaces/user";

const userSchema = new Schema<iUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    slug: { type: String, required: true },
    profileImage: String,
    profileBio: String,
    notifications: Array<iNotification>,
    follow: Array<iFollower>,
    followers: Array<iFollower>,
  },
  {
    timestamps: true,
  });

const User = model<iUser>("User", userSchema);

export default User;