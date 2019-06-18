import React, { Component } from "react";
import { Route, Link } from "react-router-dom";
export class ToggleLink extends Component {
  render() {
    return (
      <Route
        path={this.props.to}
        exact={this.props.exact}
        children={routeProps => {
          const baseClasses = this.props.className || "text-success";
          const activeClass = this.props.activeClass || "text-primary";
          const inActiveClass = this.props.inActiveClass || "text-secondary";
          const combinedClasses = `${baseClasses} ${
            routeProps.match ? activeClass : inActiveClass
          }`;
          return (
            <Link to={this.props.to} className={combinedClasses}>
              {this.props.children}
            </Link>
          );
        }}
      />
    );
  }
}
