import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import {commentsReducer} from "./slices/Comments"
import {TagsReducer} from "./slices/getTags"
const store = configureStore({
    reducer: {
        posts: postsReducer,
        auth: authReducer,
        comments: commentsReducer,
        tags: TagsReducer
    }
})
export default store