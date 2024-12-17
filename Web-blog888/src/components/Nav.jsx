// eslint-disable-next-line no-unused-vars
import React from "react";
import Loginbtn from "./Loginbtn";
import Registerbtn from "./Registerbtn";
import Logoutbtn from "./Logoutbtn";
import { useAuthContext } from "../context/AuthContext";

const Nav = () => {
  const { user } = useAuthContext();

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <a href="/" className="btn btn-ghost text-xl">
          Se NPRU Blog
        </a>
      </div>
      {user ? (
        <>
          <div className="flex-none gap-4 mr-2">
            /create button
            <a
              href="/create"
              className="btn bg-gray-500 hover:bg-gray-700 text-white"
            >
              Create Post
            </a>
            <Logoutbtn />
          </div>
        </>
      ) : (
        <>
          <div className="flex-none gap-4 mr-2">
            <Loginbtn />
            <Registerbtn />
          </div>
        </>
      )}
    </div>
  );
};

export default Nav;
