import React from "react";
import BackButton from "../../utility_components/BackButton";
import ClearButton from "../../utility_components/ClearButton";


class NavBar extends React.Component {

  onBackButtonClick = () => {
    this.props.onBackButtonClick();
  }

  onClearButtonClick = () => {
    this.props.onClearButtonClick();
  }

  render() {
    if (this.props.stage === 0) {
      return (
        <div>
          <BackButton onBackButtonClick={this.onBackButtonClick}/>
          <ClearButton onClearButtonClick={this.onClearButtonClick}/>
          Click where you want to start from
          <h2>{this.props.algo}</h2>
        </div>
      );
    }
    if (this.props.stage === 1) {
      return (
        <div>
          <BackButton onBackButtonClick={this.onBackButtonClick}/>
          <ClearButton onClearButtonClick={this.onClearButtonClick}/>
          Click where you want to end
          <h2>{this.props.algo}</h2>
        </div>
      );
    }

    if (this.props.stage === 2) {
        return (
          <div>
            <BackButton onBackButtonClick={this.onBackButtonClick}/>
            <ClearButton onClearButtonClick={this.onClearButtonClick}/>
            <h2>{this.props.algo}</h2>
          </div>
        );
      }
  }
}

export default NavBar;
