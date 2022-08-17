import { iFollower } from "./user";

export interface FollowBody{
    userID: string;
    followID: string;
    userName: string;
    followName: string;
    userSlug: string;
    followSlug: string;
}

export interface FollowResponse{
    message: string;
    follow: iFollower;
    follower: iFollower;
}

export interface UnfollowBody{
    userID: string;
    followID: string;
}

export interface UnfollowResponse{
    message: string;
    follow: iFollower[];
    followers: iFollower[];
}