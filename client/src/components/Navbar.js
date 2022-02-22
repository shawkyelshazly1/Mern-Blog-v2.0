import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../redux/auth/auth-actions";
import store from "../redux/store";

export default function Navbar() {
  const navigate = useNavigate();
  const { isAuthenticated, user_avatar } = useSelector((state) => state.auth);

  const logout = () => {
    store.dispatch(logoutUser());
    navigate("/");
  };

  return (
    <>
      <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 bg-teal-500 mb-3">
        <div className="container px-4 mx-auto flex flex-wrap items-center justify-between">
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="nav-item">
                <Link
                  className="text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase text-white"
                  to="/"
                >
                  teal Tailwind Starter Kit
                </Link>
              </li>
              {isAuthenticated ? (
                <li className="nav-item">
                  <Link
                    className="px-3 py-3 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                    to="/posts/create"
                  >
                    <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                    <span className="ml-2">Create Post</span>
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
          <div
            className="lg:flex flex-grow items-centerflex"
            id="example-navbar-danger"
          >
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              {isAuthenticated ? (
                <>
                  <li className="nav-item" onClick={logout}>
                    <Link
                      className="px-3 py-3 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="#"
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2">Logout</span>
                    </Link>
                  </li>

                  <img
                    className="w-10 h-10  rounded-full"
                    src={`${user_avatar}`}
                    alt="Avatar of Jonathan Reinink"
                  />
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/users/login"
                    >
                      <i className="fab fa-facebook-square text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2">Login</span>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                      to="/users/register"
                    >
                      <i className="fab fa-twitter text-lg leading-lg text-white opacity-75"></i>
                      <span className="ml-2">Register</span>
                    </Link>
                  </li>
                </>
              )}

              {/* <li className="nav-item">
                <a
                  className="px-3 py-2 flex items-center text-xs uppercase font-bold leading-snug text-white hover:opacity-75"
                  href="#pablo"
                >
                  <i className="fab fa-pinterest text-lg leading-lg text-white opacity-75"></i>
                  <span className="ml-2">Profile</span>
                </a>
              </li> */}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
