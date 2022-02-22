import axios from "axios";
import * as commentActionTypes from "./comment-actionTypes";
import { showErrors, clearErrors } from "../error/error-actions";
import store from "../store";
import { tokenConfig } from "../auth/auth-actions";

export const getPostComments = (post_id) => (dispatch) => {
  dispatch({ type: commentActionTypes.LOADING_COMMENTS });

  axios
    .get(`/api/posts/${post_id}/comments`)
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({
        type: commentActionTypes.COMMENTS_LOADED,
        payload: res.data.comments,
      });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: commentActionTypes.LOADING_COMMENTS_ERROR });
    });
};

export const addComment = (commentData) => (dispatch, getState) => {
  axios
    .post(
      `/api/posts/${commentData.post}/comments`,
      commentData,
      tokenConfig(getState)
    )
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({
        type: commentActionTypes.COMMENT_ADDED_SUCCESS,
        payload: res.data.comment,
      });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: commentActionTypes.COMMENT_ADDED_FAILED });
    });
};

export const deleteComment = (post_id, comment_id) => (dispatch, getState) => {
  axios
    .delete(
      `/api/posts/${post_id}/comments/${comment_id}`,
      tokenConfig(getState)
    )
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({
        type: commentActionTypes.COMMENT_DELETED_SUCCESS,
        payload: comment_id,
      });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: commentActionTypes.COMMENT_DELETED_FAILED });
    });
};
