import * as commentActionTypes from "./comment-actionTypes";

const initialState = {
  comments: [],
  isLoadingComments: false,
};

const commentsReducer = function (state = initialState, action) {
  switch (action.type) {
    case commentActionTypes.LOADING_COMMENTS:
      return {
        ...state,
        isLoadingComments: true,
      };
    case commentActionTypes.COMMENTS_LOADED:
      return {
        ...state,
        isLoadingComments: false,
        comments: action.payload,
      };
    case commentActionTypes.LOADING_COMMENTS_ERROR:
      return {
        ...state,
        comments: [],
        isLoadingComments: false,
      };
    case commentActionTypes.COMMENT_ADDED_FAILED:
    case commentActionTypes.COMMENT_DELETED_FAILED:
      return {
        ...state,
      };
    case commentActionTypes.COMMENT_ADDED_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };
    case commentActionTypes.COMMENT_DELETED_SUCCESS:
      return {
        ...state,
        comments: state.comments.filter(
          (comment) => comment._id !== action.payload
        ),
      };
    default:
      return { ...state };
  }
};

export default commentsReducer;
