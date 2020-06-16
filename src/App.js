import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import {Route, Switch} from 'react-router-dom';
import Feed from './components/feed';
import Welcome from './components/welcome';
import Navbar from './components/common/navbar';
import Studio from './components/studio/studio';
import Login from './components/auth/login';
import Signup from './components/auth/signup/signup';
import Logout from './components/auth/logout';
import UploadMusic from './components/upload/uploadMusic';
import UserPlaylist from './components/userPlaylist';
import PlaylistFeed from './components/playlistFeed';
import SearchResults from './components/searchResults';
import Footer from "./components/footer";
import ProfilePicUpload from './components/auth/profilePicUpload';
import Profile from './components/profile/profile';
import EditProfile from './components/editProfile';
import { Container } from '@material-ui/core';
import ContentPage from './components/contentPage';

function App() {
  const [user, setUser] = useState({});
  
  useEffect(() => {
    try {
      let userData = JSON.parse(localStorage.getItem('user'));
      setUser(userData);
    }
    catch (e) {
      setUser(null);
    }
  }, [])
  
  return (
  <div>
      <Navbar
        user={user}
      />
  <br/>
  <br/>
 <ToastContainer/>
      <Switch>
        <Route path='/search' render={(props) => <SearchResults {...props} user={user} />}/>
        <Route path='/uploadProfilePic' render={(props) => <ProfilePicUpload {...props} user={user} />}/>
        <Route path='/profile/:userId' render={(props) => <Profile {...props} currentUser={user} />}/>
        {/* <Route path='/profile' render={(props) => <Profile {...props} currentUser={user} />}/> */}
        <Route path='/content/:contentId' render={(props) => <ContentPage {...props} currentUser={user} />}/>
        <Route path='/edit' render={(props) => <EditProfile {...props} user={user} />}/>
        <Route path='/studio/:studioName' render={(props) => <Studio {...props} user={user} />}/>
        <Route path='/myMusic/upload' render={(props) => <UploadMusic {...props} user={user} />} />
        <Route  path='/logout' component={Logout}/>
        <Route  path='/auth/signup' component={Signup}/>
        <Route  path='/auth/login' component={Login}/>
        <Route path='/myPlaylist/:playlistName' render={(props) => <PlaylistFeed {...props} user={user} />}/>
        <Route path='/myPlaylist' render={(props) => <UserPlaylist {...props} user={user} />}/>
        <Route exact path='/' render={(props) => user ? <Feed {...props} user={user} /> : <Welcome {...props}/>} />

        {/* <Route path='/create-new-studio' render={(props) => <CreateStudio {...props} user={user} />}/> */}
        {/* <Route exact path='/' component={Welcome}/> */}
      </Switch>
      
    </div>
  );
}

export default App;
