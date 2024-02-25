import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PostDetails from "./pages/Postdetials";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Profile from "./pages/Profile";
import { UserContextProvider } from "./context/userContext";
import MyBlogs from "./pages/MyBlogs";

const App = () => {
  return (
    <div>
      <UserContextProvider>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route path="/posts/post/:id" element={<PostDetails />} />
          <Route exact path="/write" element={<CreatePost />} />
          <Route exact path="/myblogs/:id" element={<MyBlogs />} />
          <Route exact path="/edit/:id" element={<EditPost />} />
          <Route exact path="/profile/:id" element={<Profile />} />
        </Routes>
      </UserContextProvider>
    </div>
  );
};

export default App;
