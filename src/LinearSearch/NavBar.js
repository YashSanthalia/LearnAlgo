import React from "react";
import BackButton from "../utility_components/BackButton";
import ClearButton from "../utility_components/ClearButton";
import SearchButton from "../utility_components/SearchButton";


class NavBar extends React.Component {

  onBackButtonClick = () => {
    this.props.onBackButtonClick();
  }

  onClearButtonClick = () => {
    this.props.onClearButtonClick();
  }

  onSearchButtonClick = () => {
    this.props.onSearchButtonClick();
  }

  render() {
    if (this.props.stage === 0) {
      return (
        <div>
          <BackButton onBackButtonClick={this.onBackButtonClick}/>
          <ClearButton onClearButtonClick={this.onClearButtonClick}/>
          <input id="key"></input>
          <SearchButton onSearchButtonClick={this.onSearchButtonClick} />
          Enter the element you want to search
        </div>
      );
    }
    if (this.props.stage === 1) {
      return (
        <div>
          <BackButton onBackButtonClick={this.onBackButtonClick}/>
          <ClearButton onClearButtonClick={this.onClearButtonClick}/>
        </div>
      );
    }

  }
}

export default NavBar;
