import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearAuth, login } from "../actions/auth";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
    };
  }

  componentWillUnmount() {
    this.props.dispatch(clearAuth());
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value,
    });
  };

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };

  handleFormSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    if (email && password) {
      this.props.dispatch(login(email, password));
    }
  };
  render() {
    const { error, inProgress, isLoggedIn } = this.props.auth;

    if (isLoggedIn) {
      return <Navigate to="/" />;
    }
    return (
      <form className="login-form">
        <span className="login-signup-header">Login</span>
        {error && <div className="alert error-dialog">{error}</div>}
        <div className="field ">
          <input
            type="email"
            placeholder="Email"
            required
            onChange={this.handleEmailChange}
            value={this.state.email}
          />
        </div>
        <div className="field ">
          <input
            type="password"
            placeholder="Password"
            required
            onChange={this.handlePasswordChange}
            value={this.state.password}
          />
        </div>
        <div className="field ">
          {inProgress ? (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              Logging In...
            </button>
          ) : (
            <button onClick={this.handleFormSubmit} disabled={inProgress}>
              LogIn
            </button>
          )}
        </div>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(Login);
