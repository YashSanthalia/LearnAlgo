import React from "react";

class BackButton extends React.Component {
  onBackButtonClick = () => {
    this.props.onBackButtonClick();
  };

  render() {
    return <button onClick={this.onBackButtonClick}>Back</button>;
  }
}

export default BackButton;
