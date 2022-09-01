import { ObjectId } from "mongodb";
import { iFollower } from "../User/UserTypes";

export interface iUpdateQuery {
  id: ObjectId;
  set: any;
}

export interface iFollowBody {
  userID: string;
  followID: string;
}

export interface iUnfollowBody {
  userID: string;
  followID: string;
}

export interface iFollowResponse {
  message: string;
  follow: iFollower;
  follower: iFollower;
}

export interface iUnfollowResponse {
  message: string;
  follow: iFollower[];
  followers: iFollower[];
}
