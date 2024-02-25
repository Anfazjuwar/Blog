import React, { useContext, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ProfilePost from "../components/ProfilePost";
import axios from "axios";
import { UserContext } from "../context/userContext";
import { useParams, useNavigate } from "react-router-dom";
import { URL } from "../pages/url";

const Profile = () => {
  const param = useParams().id;
  const [username, setUsername] = useState("");
  const [email, SetEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [Update, setUpdated] = useState(false);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(URL + "api/users/" + user._id);
      setUsername(res.data.username);
      SetEmail(res.data.email);
      setPassword(res.data.password);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    fetchProfile();
  }, [param]);

  const handleUserUpdate = async () => {
    setUpdated(false);
    try {
      const res = await axios.put(
        URL + "/api/user" + user._id,
        { username, email, password },
        { withCredentials: true }
      );
      // console.log(res.data)
      setUpdated(true);
    } catch (err) {
      console.log(err);
      setUpdated(false);
    }
  };

  const handleUserDelete = async () => {
    try {
      const res = await axios.delete(
        URL + "/api/user/" + user._id,

        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  const fetchUserPosts = async () => {
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      setPosts(res.data);
    } catch (err) {}
  };
  useEffect(() => {
    fetchUserPosts();
  }, [param]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] mt-8 flex md:flex-row flex-col-reverse md:items-start">
        <div className="flex flex-col md:[70%] w-full md:mt-0">
          <h1 className="text-xl font-bold mb-4">Your Post:</h1>
          {posts?.map((p) => (
            <ProfilePost key={p._id} p={p} />
          ))}
        </div>
        <div className="md:sticky md:top-12 flex justify-start md:justify-end items-start md:w-[30%] w-full md:items-end">
          <div className="flex flex-col space-y-4 items-start ">
            <h1 className="text-xl font-bold mb-4">Profile</h1>
            <input
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Your username"
              type="text"
              className="outline-none px-4 py-2 text-gray-500 "
            />
            <input
              onChange={(e) => SetEmail(e.target.value)}
              value={email}
              placeholder="Your Email"
              type="Email"
              className="outline-none px-4 py-2 text-gray-500 "
            />
            {/* <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder="Your Password"
              type="password"
              className="outline-none px-4 py-2 text-gray-500 "
            /> */}
            <div className="flex items-center space-x-4 mt-4">
              <button
                onClick={handleUserUpdate}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                Update
              </button>
              <button
                onClick={handleUserDelete}
                className="text-white font-semibold bg-black px-4 py-2 hover:text-black hover:bg-gray-400"
              >
                delete
              </button>
            </div>
            {Update && (
              <h3 className="text-green-500 text-sm text-center mt-4">
                User updated successfully!
              </h3>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
