import React from "react";

class ClearButton extends React.Component {
  onClearButtonClick = () => {
    this.props.onClearButtonClick();
  };

  render() {
    return <button onClick={this.onClearButtonClick}>Clear</button>;
  }
}

export default ClearButton;
