import React from "react";

class StartButton extends React.Component {
  onStartButtonClick = () => {
    this.props.onStartButtonClick();
  };

  render() {
    return <button onClick={this.onStartButtonClick} className="btn btn-primary m-2">Start</button>;
  }
}

export default StartButton;
