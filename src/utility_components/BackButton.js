import React from "react";

class BackButton extends React.Component {
  onBackButtonClick = () => {
    this.props.onBackButtonClick();
  };

  render() {
    return <button onClick={this.onBackButtonClick} className="btn btn-primary mx-2">Back</button>;
  }
}

export default BackButton;
