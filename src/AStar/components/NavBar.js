import React from "react";

class NavBar extends React.Component {
  render() {
    if (this.props.stage === 0) {
      return (
        <div>
          Click where you want to start from
          <h2>{this.props.algo}</h2>
        </div>
      );
    }
    if (this.props.stage === 1) {
      return (
        <div>
          Click where you want to end
          <h2>{this.props.algo}</h2>
        </div>
      );
    }
    if (this.props.stage === 2) {
        return (
          <div>
            <h2>{this.props.algo}</h2>
          </div>
        );
      }
  }
}

export default NavBar;
