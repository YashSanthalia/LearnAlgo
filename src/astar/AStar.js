import React from "react";
import Sketch from "react-p5";
import Cell from "./Cell";
import NavBar from "./components/NavBar";
import {
  showingCompleteGrid,
  showingOpenSet,
  showingclosedSet,
  showingPath,
} from "./Draw";

let cols = 25,
  rows = 11;
let length, breadth;
let grid = new Array(cols);
let openSet = [];
let closedSet = [];
let start = null,
  end = null,
  current = null;
let noSolution = false,
  solution = false;
let path = [];
let reLoad = false;
let xyz;
let flag = false;

class AStar extends React.Component {
  state = { start: null, end: null, stage: 0 };

  componentDidUpdate = () => {
    if (reLoad) {
      this.cleaning();
      this.initializeGrid();
    }
    this.initializeStartAndEnd();
  };

  componentDidMount = () => {
    this.initializeGrid();
    this.initializeStartAndEnd();
  };

  setup = (p5, parent) => {
    xyz = p5
      .createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8)
      .parent(parent);
    this.initializeCanvas(p5);
    p5.frameRate(5);
  };

  windowResized = (p5) => {
    xyz = p5.createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8);
    this.initializeCanvas(p5);
    if(solution || noSolution){
      flag = true;
    }
  };

  initializeCanvas = (p5) => {
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) * 0.9;
    xyz.position(x, y);
    length = p5.width / cols;
    breadth = p5.height / rows;
  };

  initializeGrid = () => {
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Cell(i, j, rows, cols);
        grid[i][j].addNeighbours();
      }
    }
  };

  initializeStartAndEnd = () => {
    start = this.state.start;
    end = this.state.end;
    if (start) openSet.push(start);
  };

  draw = (p5) => {
    if(flag === true){
      showingCompleteGrid(p5, grid, length, breadth, rows, cols, start, end);
      showingOpenSet(p5, openSet, length, breadth, start, end);
      showingclosedSet(p5, closedSet, length, breadth, start, end);
      showingPath(p5, path, length, breadth, start, end);
    }
    if (!noSolution && !solution) {
      p5.background(0);
      if (start && end) {
        if (openSet.length > 0) {
          current = openSet[this.lowest_f_value_index()];
          if (current === end) {
            solution = true;
          }
          this.removeFromArray(openSet, current);
          closedSet.push(current);

          let neighbours = current.neighbours;
          for (let i = 0; i < neighbours.length; i++) {
            let [x, y] = neighbours[i];
            let neighbour = grid[x][y];
            if (!closedSet.includes(neighbour) && !neighbour.wall) {
              let tempG = current.g + 1;
              if (openSet.includes(neighbour)) {
                if (tempG < neighbour.g) {
                  this.updateNeighbourScore(neighbour, tempG);
                }
              } else {
                openSet.push(neighbour);
                this.updateNeighbourScore(neighbour, tempG);
              }
            }
          }
        } else if (!solution) {
          noSolution = true;
        }
      }

      showingCompleteGrid(p5, grid, length, breadth, rows, cols, start, end);

      showingOpenSet(p5, openSet, length, breadth, start, end);

      showingclosedSet(p5, closedSet, length, breadth, start, end);

      if (!noSolution && current) {
        path = [];
        path.push(current);
        while (current.prev) {
          path.push(current.prev);
          current = current.prev;
        }
      }

      showingPath(p5, path, length, breadth, start, end);
    }

    if (noSolution) {
      console.log("No Solution");
    }
  };

  updateNeighbourScore = (neighbour, tempG) => {
    neighbour.g = tempG;
    neighbour.prev = current;
    neighbour.h = this.heuristic(neighbour.i, neighbour.j);
    neighbour.f = neighbour.g + neighbour.h;
  };

  lowest_f_value_index = () => {
    let lowestIndex = 0;
    for (let i = 0; i < openSet.length; i++) {
      if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
    }
    return lowestIndex;
  };

  removeFromArray(array, element) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === element) array.splice(i, 1);
    }
  }

  mousePressed = (e) => {
    let x = e.mouseX;
    let y = e.mouseY;
    let i = Math.floor(x / length);
    let j = Math.floor(y / breadth);
    if (i >= 0 && j >= 0 && i < cols && j < rows && !grid[i][j].wall) {
      if (!this.state.start) this.setState({ start: grid[i][j], stage: 1 });
      else if (!this.state.end) this.setState({ end: grid[i][j], stage: 2 });
    }
  };

  cleaning = () => {
    openSet = [];
    closedSet = [];
    path = [];
    current = null;
    reLoad = false;
    noSolution = false;
    solution = false;
  };

  heuristic(i, j) {
    let x = this.state.end.i - i;
    let y = this.state.end.j - j;
    return Math.sqrt(x * x + y * y);
  }

  onBackButtonClick = () => {
    this.cleaning();
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    reLoad = true;
    this.setState({ start: null, end: null, stage: 0 });
  };

  render() {
    return (
      <div className="container mb-3">
        <NavBar
          stage={this.state.stage}
          algo="A*"
          onBackButtonClick={this.onBackButtonClick}
          onClearButtonClick={this.onClearButtonClick}
        />
        <div className="container">
        <Sketch
          setup={this.setup}
          draw={this.draw}
          mousePressed={this.mousePressed}
          windowResized={this.windowResized}
        />
        </div>
      </div>
    );
  }
}

export default AStar;