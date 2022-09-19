import React from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PropType from "prop-types";
import jwtDecode from "jwt-decode";
import { fetchPosts } from "../actions/posts";
import {
  Navbar,
  Home,
  Page404,
  Login,
  SignUp,
  Settings,
  UserProfile,
  
} from "./";
import { authenticateUser } from "../actions/auth";
import { getAuthTokenFromLocalStorage } from "../helpers/utils";
import { fetchUserFriend } from "../actions/friends";

class App extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPosts());
    const token = getAuthTokenFromLocalStorage();
    if (token) {
      const user = jwtDecode(token);
      this.props.dispatch(
        authenticateUser({
          email: user.email,
          _id: user._id,
          name: user.name,
        })
      );
      this.props.dispatch(fetchUserFriend());
    }
  }

  render() {
    const { posts, auth, friends } = this.props;

    return (
      <Router>
        <div>
          <Navbar />
          
          <Routes>
            <Route
              exact
              path="/"
              element={
                <Home
                  posts={posts}
                  friends={friends}
                  isLoggedIn={auth.isLoggedIn}
                />
              }
            ></Route>
            {auth.isLoggedIn && (
              <Route
                path="/settings"
                element={<Settings isLoggedIn={auth.isLoggedIn} />}
              ></Route>
            )}
            <Route path="/login" element={<Login />}></Route>
            <Route path="/signup" element={<SignUp />}></Route>
            <Route
              path="/user/:userId"
              element={<UserProfile />}
              isLoggedIn={auth.isLoggedIn}
            ></Route>

            <Route path="*" element={<Page404 />}></Route>
          </Routes>
        </div>
      </Router>
    );
  }
}

function mapStateToProps(state) {
  return {
    posts: state.posts,
    auth: state.auth,
    friends: state.friends,
  };
}

//propType = property on App component
App.propType = {
  posts: PropType.array.isRequired,
};

export default connect(mapStateToProps)(App);
