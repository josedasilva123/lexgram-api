import { iFollower } from "../User/user";

export interface iFollowBody{
    userID: string;
    followID: string;
}

export interface iUnfollowBody{
    userID: string;
    followID: string;
}

export interface iFollowResponse{
    message: string;
    follow: iFollower;
    follower: iFollower;
}

export interface iUnfollowResponse{
    message: string;
    follow: iFollower[];
    followers: iFollower[];
}