import { Schema, model } from "mongoose";

interface iNotifications{
    postID: string;
    postSlug: string;
    text: string;
}
interface iFollower{
    userID: string;
    userName: string;
    userSlug: string;
}

interface iUser{
    name: string;
    email: string;
    password: string;
    slug: string;
    createAt: Date;
    updateAt: Date;
    profileImage?: string;
    profileBio?: string;
    notifications?: iNotifications[];
    follow?: iFollower[];
    followers?: iFollower[];
}

const userSchema = new Schema<iUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    slug: { type: String, required: true },
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: true },
    profileImage: String,
    profileBio: String,
    notifications: Array<iNotifications>,
    follow: Array<iFollower>,
    followers: Array<iFollower>,
  });

const User = model<iUser>("User", userSchema);

export default User;