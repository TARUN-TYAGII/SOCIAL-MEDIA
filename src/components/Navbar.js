import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";

class Navbar extends Component {
  handleLogout = () => {
    localStorage.removeItem("token");
    this.props.dispatch(logout());
  };
  render() {
    const { auth } = this.props;

    return (
      <nav className="nav">
        <div className="left-div">
          <Link to="/">
            <img
              src="https://cdn-icons-png.flaticon.com/128/5968/5968292.png"
              alt="logo"
            />
          </Link>
        </div>
        <div className="search-container">
          <img
            className="search-icon"
            src="https://cdn-icons-png.flaticon.com/128/622/622669.png"
            alt="search-icon"
          />
          <input placeholder="search" />
          <div className="search-results">
            <ul>
              <li className="search-results-row">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="user-dp"
                />
                <span>shiva</span>
              </li>
              <li className="search-results-row">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="user-dp"
                />
                <span>shiva</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="rigth-nav">
          <Link to="/settings">
            {auth.isLoggedIn && (
              <div className="user">
                <img
                  src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                  alt="user-dp"
                  id="user-dp"
                />
                <span>{auth.user.name}</span>
              </div>
            )}
          </Link>

          <div className="nav-links">
            <ul>
              {!auth.isLoggedIn && (
                <Link to="/login">
                  <li>Log In</li>
                </Link>
              )}
              {auth.isLoggedIn && <li onClick={this.handleLogout}>Log Out</li>}

              {!auth.isLoggedIn && (
                <Link to="signup">
                  <li>Register</li>
                </Link>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps)(Navbar);
