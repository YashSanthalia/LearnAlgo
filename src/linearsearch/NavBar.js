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
        <div className="mt-3">
          <h2>{this.props.algo}</h2>
        <div className="row">
          <div className="col-md-8">
          <input id="key" className="form-control" placeholder="Enter the element you want to search"></input>
          <SearchButton onSearchButtonClick={this.onSearchButtonClick} />
          </div>
          <div className="col-md-4">
          <BackButton onBackButtonClick={this.onBackButtonClick}/>
          <ClearButton onClearButtonClick={this.onClearButtonClick}/>
          </div>
        </div>
        </div>
      );
    }
    if (this.props.stage === 1) {
      return (
        <div className="mt-3">
          <h2>{this.props.algo}</h2>
          <BackButton onBackButtonClick={this.onBackButtonClick}/>
          <ClearButton onClearButtonClick={this.onClearButtonClick}/>
        </div>
      );
    }

  }
}

export default NavBar;
