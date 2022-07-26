import { ObjectId } from "mongodb";

export interface Notifications{
    postID: string;
    postSlug: string;
    text: string;
}

export interface Follower{
    userID: string;
    userName: string;
    userSlug: string;
}

export interface User{
    id?: ObjectId;
    name: string;
    email: string;
    password?: string;
    slug: string;
    createAt: Date;
    updateAt: Date;
    profileImage?: string;
    profileBio?: string;
    notifications?: Notifications[];
    follow?: Follower[];
    followers?: Follower[];
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
    user: User;
    token?: string;
}

export interface AutoLoginBody{
    decodedID: string;
}