import React from "react";
import Graph from "./Graph";
import Menu from './Menu';

class SortingVisualizer extends React.Component {
  
  generateNewArray = () => {
    this.props.onGenerateNewArray();
  };

  render() {
    return (
      <div>
        <Menu array = {this.props.array} onGenerateNewArray = {this.generateNewArray}/>
        <Graph array={this.props.array} />
      </div>
    );
  }
}

export default SortingVisualizer;
