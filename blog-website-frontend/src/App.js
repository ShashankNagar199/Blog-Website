import React, {useState} from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import './App.css';
import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import DashBoard from './components/DashBoard/DashBoard';
import PostForm from './components/PostForm/PostForm';
import Profile from './components/Profile/Profile';
import AllBlogs from './components/AllBlogs/AllBlogs';
import BlogPage from './components/BlogPage/BlogPage';
import MyBlogPage from './components/MyBlogPage/MyBlogPage';
import AdminHome from './components/Admin/AdminHome/AdminHome';
import AdminPostPage from './components/Admin/AdminPosts/AdminPosts';
import AdminUsersPage from './components/Admin/AdminUsers/AdminUsers';
import Blog from './components/Blog/Blog';

function App() {

  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const loginStateHandler = (loggedInState) => {
    setLoggedIn(loggedInState);
  }

  const currentUserStateHandler = (user) => {
    setCurrentUser(user);
  }
  // let blogToBeRendered = {
  //   id: 1,
  //   title: '',
  //   description: '',
  //   body: ''
  // };

  //console.log("Rendered " + blogToBeRendered.title);

  // const getBlog = (blog) => {
  //   console.log(blog + " will be assigned");
  //   //blogToBeRendered = {...blog};
  //   blogToBeRendered.title = blog.title;
  //   blogToBeRendered.description = blog.description;
  //   blogToBeRendered.body = blog.body;
  //   blogToBeRendered.category = blog.category;
  //   blogToBeRendered.id = blog.id;
  //   console.log(blogToBeRendered);
  // }

//  console.log(blogToBeRendered);

  const logoutUser = () => {
    setLoggedIn(false);
    setCurrentUser(null);
  }

  return (
    <div>
      <Navbar loggedIn={loggedIn} currentUser={currentUser} logoutUser={logoutUser}/>
      <Routes>
        <Route path='/login' element={<Login loggedIn={false} changeLoginState={loginStateHandler} changeUserState={currentUserStateHandler}/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/' element={<Home />} />
        <Route path='/dashboard/' element={<DashBoard currentUser={currentUser}/>} />
        <Route path='/new-post' element={<PostForm />} />
        <Route exact path='/profile' element={<Profile currentUser={currentUser}/>}/>
        <Route path='/blogs' element={<AllBlogs currentUser={currentUser}/>} />
        <Route exact path='/blog' element={<BlogPage currentUser={currentUser}/> } />
        <Route exact path='/profile/my-blog' element={<MyBlogPage user={currentUser}/>}/>
        <Route exact path='/admin' element={<AdminHome />} />
        <Route exact path='/admin/review-posts' element={ <AdminPostPage /> }/>
        <Route exact path='/admin/delete-users' element={<AdminUsersPage />}/>
        <Route exact path='/admin/read-blog' element={<Blog />}/>
        <Route exact path='/edit' element={<PostForm />} />
      </Routes>
    </div>
  );
}

export default App;
