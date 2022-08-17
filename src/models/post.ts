import { Schema, model } from "mongoose";
import { iLike, iComments } from "../interfaces/post";


const postSchema = new Schema({
    userID: { type: String, required: true},
    image: { type: String, required: true},
    description: { type: String, required: true},
    createAt: { type: Date, required: true },
    updateAt: { type: Date, required: true },
    likes: Array<iLike>,
    comments: Array<iComments>,
},
{
    timestamps: true,
})

const Post = model("Post", postSchema);

export default Post;