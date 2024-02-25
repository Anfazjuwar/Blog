import React, { useContext } from "react";
import { UserContext } from "../context/userContext";
import axios from "axios";
import { URL } from "../pages/url";
import { Link, useNavigate } from "react-router-dom";

const Menu = () => {
  const { user } = useContext(UserContext);
  const { setUSer } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(URL + "/api/auth/logout", {
        withCredentials: true,
      });
      // console.log(res);
      setUSer(null);
      navigate("/login");
    } catch (err) {
      console(err);
    }
  };
  return (
    <div className="bg-black w-[200px] z-10 flex flex-col items-start absolute top-12 right-6 p-4 space-y-4 md:right-32">
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/">Login</Link>
        </h3>
      )}
      {!user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/resgister">Resgister</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to={"/profile/" + user._id}>Profile</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to="/write">Write</Link>
        </h3>
      )}
      {user && (
        <h3 className="text-white text-sm hover:text-gray-500">
          <Link to={"/myblogs/" + user._id}>My blogs</Link>
        </h3>
      )}
      {user && (
        <h3
          onClick={handleLogout}
          className="text-white text-sm hover:text-gray-500"
        >
          logout
        </h3>
      )}
    </div>
  );
};

export default Menu;
