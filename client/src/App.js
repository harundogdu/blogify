import React from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { Home, PostDetail, Login, Operations } from 'pages'
import { Header, Footer } from 'components';
import { loginUserSuccess } from "features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  const [isAddPost, setIsAddPost] = React.useState(false);
  React.useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(loginUserSuccess());
    }
  }, [dispatch]);

  return (
    <div className='w-full min-h-screen flex flex-col bg-gray-100'>
      <Header setIsAddPost={setIsAddPost} />

      <Routes>
        <Route path="/" element={<Home isAddPost={isAddPost} setIsAddPost={setIsAddPost} />} />
        <Route path="/login" element={<Login />} />
        <Route path="posts/:slug" element={<PostDetail />} />
        <Route path="/operation" element={<Operations />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
