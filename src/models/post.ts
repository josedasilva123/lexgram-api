import { Schema, model } from "mongoose";

interface iLike{
    userID: string;
    userName: string
}

interface iAnswers{
    string: string;
    userName: string;
    text: string;
}

interface iComments{
    userID: string;
    userName: string;
    likes?: iLike[];
    answers?: iAnswers; 
}


interface iPost{
    userID: string;
    image: string;
    description: string;
    createAt: Date;
    updateAt: Date;
    likes?: iLike[];
    comments?: iComments;
}

const postSchema = new Schema<iPost>({
    userID: { type: String, required: true},
    image: { type: String, required: true},
    description: { type: String, required: true},
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: true },
    likes: Array<iLike>,
    comments: Array<iComments>,
})

const Post = model<iPost>("Post", postSchema);

export default Post;