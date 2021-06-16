import React from "react";
import Graph from "./Graph";
import Menu from "./Menu";

class SortingVisualizer extends React.Component {
  generateNewArray = () => {
    this.props.onGenerateNewArray();
  };

  onBackButtonClick = () => {
    this.props.onBackButtonClick();
  }
  
  render() {
    return (
      <div className="container">
        <Menu
          array={this.props.array}
          onGenerateNewArray={this.generateNewArray}
          onBackButtonClick={this.onBackButtonClick}
        />
        <Graph array={this.props.array} />
      </div>
    );
  }
}

export default SortingVisualizer;
