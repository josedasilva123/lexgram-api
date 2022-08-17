import { ObjectId } from "mongodb";

export interface iNotifications{
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
    notifications?: iNotifications[] | [];
    follow?: iFollower[] | [],
    followers?: iFollower[] | [];
}

export interface RegisterBody{
    name: string;
    email: string;
    password: string;
    slug: string;
}

export interface RegisterSucessResponse{
    message: string;
}

export interface LoginBody{
    email: string;
    password: string;
}

export interface LoginSucessResponse{
    user: iUser;
    token?: string;
}

export interface AutoLoginBody{
    decodedID: string;
}