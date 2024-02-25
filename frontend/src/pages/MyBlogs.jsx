import HomePost from "../components/HomePost";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";
import { URL } from "../pages/url";
import { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Loader from "../components/Loader";
import { UserContext } from "../context/userContext";

const MyBlogs = () => {
  const { search } = useLocation();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoresults] = useState(false);
  const [loder, setLoder] = useState(false);
  const { user } = useContext(UserContext);

  const fetchPosts = async () => {
    setLoder(true);
    try {
      const res = await axios.get(URL + "/api/posts/user/" + user._id);
      // console.log(res.data)
      setPosts(res.data);
      if (res.data.length === 0) {
        setNoresults(true);
      } else {
        setNoresults(false);
      }
      setLoder(false);
    } catch (err) {
      console.log(err);
      setLoder(true);
    }
  };
  useEffect(() => {
    fetchPosts();
  }, [search]);
  return (
    <div>
      <Navbar />
      <div className="px-8 md:px-[200px] min-h-[80vh]">
        {loder ? (
          <div className="h-[40vh] flex justify-center items-center">
            <Loader />
          </div>
        ) : !noResults ? (
          posts.map((post) => (
            <>
              <Link
                key={post._id}
                to={user ? `/posts/post/${post._id}` : "/login"}
              >
                <HomePost key={post._id} post={post} />
              </Link>
            </>
          ))
        ) : (
          <h3 className="text-centre font-bold mt-16">No posts availble </h3>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default MyBlogs;
