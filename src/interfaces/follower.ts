import { iFollower } from "./user";

export interface iFollowBody{
    userID: string;
    followID: string;
    userName: string;
    followName: string;
    userSlug: string;
    followSlug: string;
}

export interface iFollowResponse{
    message: string;
    follow: iFollower;
    follower: iFollower;
}

export interface iUnfollowBody{
    userID: string;
    followID: string;
}

export interface iUnfollowResponse{
    message: string;
    follow: iFollower[];
    followers: iFollower[];
}