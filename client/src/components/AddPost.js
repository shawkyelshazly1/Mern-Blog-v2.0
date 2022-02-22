import React, { useEffect } from "react";
import store from "../redux/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addPost, redirectToPost } from "../redux/post/post-actions";

export default function AddPost() {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated, user_id } = useSelector(
    (state) => state.auth
  );

  const { loadedPost, postAdded } = useSelector((state) => state.posts);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      navigate("/");
    }
  }, [isLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (postAdded) {
      navigate(`/posts/${loadedPost._id}`);
    }

    return () => {
      store.dispatch(redirectToPost());
    };
  }, [postAdded]);

  const submitForm = (e) => {
    e.preventDefault();

    const post = {
      title: e.target[0].value,
      content: e.target[1].value,
      author: user_id,
    };

    store.dispatch(addPost(post));
  };

  return (
    <>
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
            <div className="p-6 bg-white border-b border-gray-200">
              <form action="" onSubmit={(e) => submitForm(e)}>
                <div className="mb-4">
                  <label className="text-xl text-gray-600">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <input
                    type="text"
                    className="border-2 border-gray-300 p-2 w-full"
                    name="title"
                    id="title"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xl text-gray-600">
                    Content <span className="text-red-500">*</span>
                  </label>
                  <br />
                  <textarea
                    required
                    name="content"
                    className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                  ></textarea>
                </div>

                <div className="flex p-1 justify-center">
                  <button
                    className="p-3 bg-blue-500 text-lg text-white px-10 rounded-3xl hover:bg-blue-400 "
                    required
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      ;
    </>
  );
}
