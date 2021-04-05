import React from "react";

class SearchButton extends React.Component {
  onSearchButtonClick = () => {
    this.props.onSearchButtonClick();
  };

  render() {
    return <button onClick={this.onSearchButtonClick}>Search</button>;
  }
}

export default SearchButton;
