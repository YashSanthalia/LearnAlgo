import React from "react";
import Dijkstra from "./Dijkstra/Dijkstra";
import BackTracking from "./BackTracking/BackTracking";
import AStar from "./AStar/AStar";
import Sorting from "./Sorting/Sorting";
import LinearSearch from "./LinearSearch/LinearSearch";
import BinarySearch from "./BinarySearch/BinarySearch";
import TSP from "./TSP/TSP";

class App extends React.Component {
  state = { option: 0 };

  onBackButtonClick = () => {
    this.setState({ option: 0 });
  };

  render() {
    if (this.state.option === 0) {
      return (
        <div>
          <button
            onClick={() => {
              this.setState({ option: 1 });
            }}
          >
            Dijkstra
          </button>
          <button
            onClick={() => {
              this.setState({ option: 2 });
            }}
          >
            BackTracking
          </button>
          <button
            onClick={() => {
              this.setState({ option: 3 });
            }}
          >
            A*
          </button>
          <button
            onClick={() => {
              this.setState({ option: 4 });
            }}
          >
            Sorting
          </button>
          <button
            onClick={() => {
              this.setState({ option: 5 });
            }}
          >
            LinearSearch
          </button>
          <button
            onClick={() => {
              this.setState({ option: 6 });
            }}
          >
            BinarySearch
          </button>
          <button
            onClick={() => {
              this.setState({ option: 7 });
            }}
          >
            TSP
          </button>
        </div>
      );
    } else if (this.state.option === 1) {
      return <Dijkstra onBackButtonClick={this.onBackButtonClick} />;
    } else if (this.state.option === 2) {
      return <BackTracking onBackButtonClick={this.onBackButtonClick} />;
    } else if (this.state.option === 3) {
      return <AStar onBackButtonClick={this.onBackButtonClick} />;
    } else if (this.state.option === 4) {
      return <Sorting onBackButtonClick={this.onBackButtonClick} />;
    }else if (this.state.option === 5) {
      return <LinearSearch onBackButtonClick={this.onBackButtonClick} />;
    }else if (this.state.option === 6) {
      return <BinarySearch onBackButtonClick={this.onBackButtonClick} />;
    }else if (this.state.option === 7) {
      return <TSP onBackButtonClick={this.onBackButtonClick} />;
    }


  }
}

export default App;
