import React, { Component } from "react";
import PropTypes from "prop-types";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import { ToggleLink } from "./ToggleLink";

class AppNavbar extends Component {
  state = {
    isAuthenticated: false
  };

  static getDerivedStateFromProps(props, state) {
    const { auth } = props;

    if (auth.uid) {
      return { isAuthenticated: true };
    } else {
      return { isAuthenticated: false };
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    const { firebase } = this.props;
    firebase.logout();
  };

  render() {
    const { isAuthenticated } = this.state;
    const { auth } = this.props;
    const { allowRegistration } = this.props.settings;

    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light mb-4">
        <div className="container">
          <ToggleLink to="/" className="navbar-brand">
            ClientPanel
          </ToggleLink>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarMain">
            <ul className="navbar-nav mr-auto">
              {isAuthenticated ? (
                <li className="nav-item">
                  <ToggleLink to="/" className="nav-link">
                    Dashboard
                  </ToggleLink>
                </li>
              ) : null}
            </ul>
            {isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link text-secondary">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <ToggleLink to="/settings" className="nav-link">
                    Settings
                  </ToggleLink>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link text-secondary"
                    onClick={this.onLogoutClick}
                  >
                    {" "}
                    <i class="fas fa-sign-out-alt" />
                    Logout
                  </a>
                </li>
              </ul>
            ) : null}

            {allowRegistration && !isAuthenticated ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <ToggleLink to="/login" className="nav-link">
                    Login
                  </ToggleLink>
                </li>
                <li className="nav-item">
                  <ToggleLink to="/signup" className="nav-link">
                    SignUp
                  </ToggleLink>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }))
)(AppNavbar);
