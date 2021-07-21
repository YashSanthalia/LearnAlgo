import React from "react";
import Dijkstra from "./dijkstra/Dijkstra";
import BackTracking from "./backtracking/BackTracking";
import AStar from "./astar/AStar";
import Sorting from "./sorting/Sorting";
import LinearSearch from "./linearsearch/LinearSearch";
import BinarySearch from "./binarysearch/BinarySearch";
import TSP from "./tsp/TSP";
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  state = { option: 0 };

  onBackButtonClick = () => {
    this.setState({ option: 0 });
  };

  render() {
    if (this.state.option === 0) {
      return (
        <div className="container mt-3">
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 1 });
            }}
          >
            Dijkstra
          </button>
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 2 });
            }}
          >
            Back Tracking
          </button>
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 3 });
            }}
          >
            A*
          </button>
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 4 });
            }}
          >
            Sorting
          </button>
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 5 });
            }}
          >
            Linear Search
          </button>
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 6 });
            }}
          >
            Binary Search
          </button>
          <button className="btn btn-primary m-2"
            onClick={() => {
              this.setState({ option: 7 });
            }}
          >
            Minimum Spanning Tree
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
