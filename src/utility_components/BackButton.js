import React from "react";

class BackButton extends React.Component {
  onBackButtonClick = () => {
    this.props.onBackButtonClick();
  };

  render() {
    return <button onClick={this.onBackButtonClick} className="btn btn-primary m-2">Back</button>;
  }
}

export default BackButton;
