import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Switch as RouterSwitch } from "react-router-dom";
import Feed from "./components/feed";
import Welcome from "./components/welcome";
import Navbar from "./components/common/navbar";
import Login from "./components/auth/login";
import Signup from "./components/auth/signup/signup";
import Logout from "./components/auth/logout";
import UploadMusic from "./components/upload/uploadMusic";
import UserPlaylist from "./components/userPlaylist";
import PlaylistFeed from "./components/playlistFeed";
import SearchResults from "./components/searchResults";
import ProfilePicUpload from "./components/auth/profilePicUpload";
import Profile from "./components/profile/profile";
import EditProfile from "./components/editProfile";
import { Container} from "@material-ui/core";
import ContentPage from "./components/content/contentPage";

// import darkTheme from './config/themes/dark';
// import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./config/globalStyles";
import { lightTheme, darkTheme } from "./config/Themes";
import { getUser } from "./services/userServices";
import ProtectedRoute from "./components/auth/protectedRoute";

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
    setUser(getUser());
  }, []);

  return (
    <ThemeProvider theme={dark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Container maxWidth='100%'>

      <Navbar user={user} />
    

      <br />
      <br />
      <ToastContainer />
      <RouterSwitch>
        <ProtectedRoute
          path="/search"
         component={SearchResults}
        />
        <ProtectedRoute
          path="/uploadProfilePic"
         component={ProfilePicUpload}
        />
        <ProtectedRoute
          path="/profile/:userId"
         component={Profile}
        />
        <ProtectedRoute
          path="/content/:contentId"
         component={ContentPage}
        />
        <ProtectedRoute
          path="/edit"
        component={EditProfile}
          />
          
        <ProtectedRoute
          path="/myMusic/upload"
         component={UploadMusic}
          />
          
        <Route path="/logout" component={Logout} />
        <Route path="/auth/signup" component={Signup} />
        <Route path="/auth/login" component={Login} />
       
          <ProtectedRoute
          path="/myPlaylist/:userId/:playlistName"
       component={PlaylistFeed}
          />
          
        <ProtectedRoute
          path="/myPlaylist/:userId"
         component={UserPlaylist}
          />
          
        <Route
          exact
          path="/"
          render={(props) =>
            user ? <Feed {...props} user={user} /> : <Welcome {...props} />
          }
        />

        </RouterSwitch>
        </Container>
    </ThemeProvider>
  );
}

export default App;
