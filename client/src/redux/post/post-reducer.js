import * as postActionTypes from "./post-actionTypes";

const initialState = {
  posts: [],
  isLoading: false,
  loadedPost: {},
  postAdded: false,
};

const postsReducer = function (state = initialState, action) {
  switch (action.type) {
    case postActionTypes.LOADING_POSTS:
    case postActionTypes.LOADING_POST:
      return {
        ...state,
        isLoading: true,
      };
    case postActionTypes.POSTS_LOADED:
      return {
        ...state,
        isLoading: false,
        posts: action.payload,
      };
    case postActionTypes.POSTS_LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        posts: [],
      };
    case postActionTypes.POST_ADDED_SUCCESS:
      return {
        ...state,
        loadedPost: action.payload,
        postAdded: true,
      };
    case postActionTypes.POST_ADDED_AND_REDIRECTED:
      return {
        ...state,
        postAdded: false,
      };
    case postActionTypes.POST_ADDED_FAILED:
      return {
        ...state,
        loadedPost: {},
      };
    case postActionTypes.POST_LOADING_ERROR:
      return {
        ...state,
        isLoading: false,
        loadedPost: {},
      };
    case postActionTypes.POST_LOADED:
      return {
        ...state,
        isLoading: false,
        loadedPost: action.payload,
      };
    default:
      return { ...state };
  }
};

export default postsReducer;
