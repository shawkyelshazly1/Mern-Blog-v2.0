import React from "react";
import { useSelector } from "react-redux";
import store from "../redux/store";
import { ReactComponent as TrashSVG } from "./trash.svg";
import { deleteComment } from "../redux/comment/comment-actions";

export default function Comment({ comment }) {
  const { user_id } = useSelector((state) => state.auth);

  const deleteCommentAction = () => {
    store.dispatch(deleteComment(comment.post, comment._id));
  };

  return (
    <div className="relative flex items-center self-center w-full max-w-xl p-4 overflow-hidden text-gray-600 focus-within:text-gray-400">
      <img
        className="w-10 h-10 object-cover rounded-full shadow mr-2 cursor-pointer"
        alt="User avatar"
        src={`${comment.author.avatar}`}
      />
      <div className="flex  ">
        <div className="text-gray-600 text-xs font-semibold">
          {comment.author.username}
        </div>
      </div>
      <span className="absolute  right-0 flex items-center pr-6"></span>
      <p
        className="rounded-3xl w-full py-2 pl-4 pr-10 text-sm bg-gray-100 border border-transparent appearance-none rounded-tg placeholder-gray-400 focus:bg-white focus:outline-none focus:border-blue-500 focus:text-gray-900 focus:shadow-outline-blue"
        placeholder="Post a comment..."
        autoComplete="off"
      >
        {comment.content}
      </p>
      {comment.author._id === user_id ? (
        <TrashSVG className="trash-svg" onClick={deleteCommentAction} />
      ) : (
        <></>
      )}
    </div>
  );
}
