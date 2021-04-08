import React from "react";

class StartButton extends React.Component {
  onStartButtonClick = () => {
    this.props.onStartButtonClick();
  };

  render() {
    return <button onClick={this.onStartButtonClick}>Start</button>;
  }
}

export default StartButton;
