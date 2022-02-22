import { combineReducers } from "redux";
import authReducer from "./auth/auth-reducer";
import errorReducer from "./error/error-reducer";
import postsReducer from "./post/post-reducer";
import commentsReducer from "./comment/comment-reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  posts: postsReducer,
  comments: commentsReducer,
});

export default rootReducer;
