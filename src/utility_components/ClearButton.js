import React from "react";

class ClearButton extends React.Component {
  onClearButtonClick = () => {
    this.props.onClearButtonClick();
  };

  render() {
    return <button onClick={this.onClearButtonClick} className="btn btn-primary m-2">Clear</button>;
  }
}

export default ClearButton;
