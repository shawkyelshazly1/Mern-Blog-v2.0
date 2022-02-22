import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import store from "../redux/store";
import { loadPosts } from "../redux/post/post-actions";

export default function Homepage() {
  const { posts } = useSelector((state) => state.posts);

  useEffect(() => {
    store.dispatch(loadPosts());
  }, []);

  return (
    <div className="px-9 py-3 grid grid-cols-3 gap-9">
      {posts.map((post) => {
        return <Card post={post} key={post._id} />;
      })}
    </div>
  );
}
