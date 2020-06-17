import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Switch as RouterSwitch } from "react-router-dom";
import Feed from "./components/feed";
import Welcome from "./components/welcome";
import Navbar from "./components/common/navbar";
import Studio from "./components/studio/studio";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup/signup";
import Logout from "./components/auth/logout";
import UploadMusic from "./components/upload/uploadMusic";
import UserPlaylist from "./components/userPlaylist";
import PlaylistFeed from "./components/playlistFeed";
import SearchResults from "./components/searchResults";
import Footer from "./components/footer";
import ProfilePicUpload from "./components/auth/profilePicUpload";
import Profile from "./components/profile/profile";
import EditProfile from "./components/editProfile";
import { Container, Paper } from "@material-ui/core";
import colors from "./config/colors";
import ContentPage from "./components/contentPage";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
// import darkTheme from './config/themes/dark';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes";

function App() {
  const [user, setUser] = useState({});
  const [dark, setDark] = useState(true);

  //   const darkTheme = createMuiTheme({
  //     palette: {
  //       type: 'dark',
  //       primary: {
  //         main: '#121212',
  //         dark: '#000'
  //       }
  // }
  //   });
  //   const lightTheme = createMuiTheme();

  useEffect(() => {
    try {
      let userData = JSON.parse(localStorage.getItem("user"));
      setUser(userData);
    } catch (e) {
      setUser(null);
    }
  }, []);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyles />

      <Navbar user={user} />
      <FormGroup row>
        <FormControlLabel
          control={
            <Switch
              label="Switch theme"
              checked={dark}
              onChange={() => setDark(!dark)}
            />
          }
          label="Switch theme"
        />
      </FormGroup>

      <br />
      <br />
      <ToastContainer />
      <RouterSwitch>
        <Route
          path="/search"
          render={(props) => <SearchResults {...props} user={user} />}
        />
        <Route
          path="/uploadProfilePic"
          render={(props) => <ProfilePicUpload {...props} user={user} />}
        />
        <Route
          path="/profile/:userId"
          render={(props) => <Profile {...props} currentUser={user} />}
        />
        {/* <Route path='/profile' render={(props) => <Profile {...props} currentUser={user} />}/> */}
        <Route
          path="/content/:contentId"
          render={(props) => <ContentPage {...props} currentUser={user} />}
        />
        <Route
          path="/edit"
          render={(props) => <EditProfile {...props} user={user} />}
        />
        <Route
          path="/studio/:studioName"
          render={(props) => <Studio {...props} user={user} />}
        />
        <Route
          path="/myMusic/upload"
          render={(props) => <UploadMusic {...props} user={user} />}
        />
        <Route path="/logout" component={Logout} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/login" component={Login} />
        <Route
          path="/myPlaylist/:userId/:playlistName"
          render={(props) => <PlaylistFeed {...props} user={user} />}
        />
        <Route
          path="/myPlaylist/:userId"
          render={(props) => <UserPlaylist {...props} user={user} />}
        />
        <Route
          exact
          path="/"
          render={(props) =>
            user ? <Feed {...props} user={user} /> : <Welcome {...props} />
          }
        />

      </RouterSwitch>
    </ThemeProvider>
  );
}

export default App;
