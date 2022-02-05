import React from "react";
import { Routes, Route } from "react-router-dom";
import { Header, Footer } from 'components/export';
import Login from "pages/Login";
import Home from "pages/Home";
import { useDispatch } from "react-redux";
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
        <Route path="/" element={<Home isAddPost={isAddPost} />} />
        <Route path="/login" element={<Login />} />
      </Routes>

      <Footer />
    </div>
  );
}

export default App;
