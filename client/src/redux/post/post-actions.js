import axios from "axios";
import * as postActionTypes from "./post-actionTypes";
import store from "../store";
import { showErrors, clearErrors } from "../error/error-actions";
import { getPostComments } from "../comment/comment-actions";
import { tokenConfig } from "../auth/auth-actions";

export const loadPosts = () => (dispatch) => {
  dispatch({ type: postActionTypes.LOADING_POSTS });

  axios
    .get("/api/posts")
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({ type: postActionTypes.POSTS_LOADED, payload: res.data.posts });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: postActionTypes.POSTS_LOADING_ERROR });
    });
};

export const loadPost = (post_id) => (dispatch) => {
  dispatch({ type: postActionTypes.LOADING_POST });

  axios
    .get(`/api/posts/${post_id}`)
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({
        type: postActionTypes.POST_LOADED,
        payload: res.data.post,
      });
      store.dispatch(getPostComments(post_id));
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: postActionTypes.POST_LOADING_ERROR });
    });
};

export const addPost = (postData) => (dispatch, getState) => {
  const body = JSON.stringify(postData);
  axios
    .post("/api/posts", body, tokenConfig(getState))
    .then((res) => {
      store.dispatch(clearErrors());
      dispatch({
        type: postActionTypes.POST_ADDED_SUCCESS,
        payload: res.data.post,
      });
    })
    .catch((err) => {
      store.dispatch(showErrors(err.response.data.error));
      dispatch({ type: postActionTypes.POST_ADDED_FAILED });
    });
};

export const redirectToPost = () => (dispatch) => {
  dispatch({
    type: postActionTypes.POST_ADDED_AND_REDIRECTED,
  });
};
