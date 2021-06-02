import React from "react";

class SearchButton extends React.Component {
  onSearchButtonClick = () => {
    this.props.onSearchButtonClick();
  };

  render() {
    return <button onClick={this.onSearchButtonClick} className="btn btn-primary m-2">Search</button>;
  }
}

export default SearchButton;
