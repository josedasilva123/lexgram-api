import { ObjectId } from "mongodb";

export interface iNotification{
    postID: string;
    postSlug: string;
    text: string;
}

export interface iFollower{
    userID: string;
    userName: string;
    userSlug: string;
}

export interface iUser{
    _id?: ObjectId;
    name: string;
    email: string;
    password?: string;
    slug: string;
    profileImage?: string;
    profileBio?: string;
    notifications?: iNotification[] | [];
    follow?: iFollower[] | [],
    followers?: iFollower[] | [];
}

export interface iRegisterBody{
    name: string;
    email: string;
    password: string;
    slug: string;
}

export interface iRegisterSucessResponse{
    message: string;
}

export interface iLoginBody{
    email: string;
    password: string;
}

export interface iLoginSucessResponse{
    user: iUser;
    token?: string;
}

export interface iAutoLoginBody{
    decodedID: string;
}

export interface iVerifySlugQuery{
    slug: string;
}

export interface iVerifySlugSucessResponse{
    message: string;
}