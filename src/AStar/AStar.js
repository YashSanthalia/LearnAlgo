import React from "react";
import Sketch from "react-p5";
import Cell from "./Cell";
import NavBar from "./components/NavBar";

let cols, rows;
const side = 20;
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

class AStar extends React.Component {
  state = { start: null, end: null, stage: 0 };

  componentDidUpdate = () => {
    if (reLoad) {
      openSet = [];
      closedSet = [];
      noSolution = false;
      path = [];
      current = null;
      reLoad = false;
      noSolution = false;
      solution = false;
      for (let i = 0; i < cols; i++) {
        grid[i] = new Array(rows);
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          grid[i][j] = new Cell(i, j, rows, cols);
          grid[i][j].addNeighbours();
        }
      }
    }
    start = this.state.start;
    end = this.state.end;
    if (start) openSet.push(start);
  };

  componentDidMount = () => {
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Cell(i, j, rows, cols);
        grid[i][j].addNeighbours();
      }
    }
    start = this.state.start;
    end = this.state.end;
    if (start) openSet.push(start);
  };

  setup = (p5, parent) => {
    let xyz = p5.createCanvas(1200, 500).parent(parent);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    // p5.frameRate(5);
    cols = p5.width / side;
    rows = p5.height / side;
  };

  draw = (p5) => {
    if (!noSolution && !solution) {
      p5.background(0);
      if (start && end) {
        if (openSet.length > 0) {
          let lowestIndex = 0;
          for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
          }
          current = openSet[lowestIndex];
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
                  neighbour.g = tempG;
                  neighbour.prev = current;
                  neighbour.h = this.heuristic(neighbour.i, neighbour.j);
                  neighbour.f = neighbour.g + neighbour.h;
                }
              } else {
                neighbour.g = tempG;
                openSet.push(neighbour);
                neighbour.prev = current;
                neighbour.h = this.heuristic(neighbour.i, neighbour.j);
                neighbour.f = neighbour.g + neighbour.h;
              }
            }
          }
        } else if(!solution){
          noSolution = true;
        }
      }

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * side;
          let y = j * side;
          p5.fill(255);
          p5.stroke(0);
          if (grid[i][j].wall) {
            p5.fill(0);
            p5.stroke(0);
          }
          if (grid[i][j] === start) {
            p5.fill(233, 222, 21);
          }
          if (grid[i][j] === end) {
            p5.fill(228, 31, 4);
          }
          p5.rect(x, y, side, side);
        }
      }

      for (let i = 0; i < openSet.length; i++) {
        let x = openSet[i].i;
        let y = openSet[i].j;
        x = x * side;
        y = y * side;
        p5.fill(139, 237, 151);
        p5.stroke(0);
        if (openSet[i] === start) {
          p5.fill(233, 222, 21);
        }
        if (openSet[i] === end) {
          p5.fill(228, 31, 4);
        }
        p5.rect(x, y, side, side);
      }

      for (let i = 0; i < closedSet.length; i++) {
        let x = closedSet[i].i;
        let y = closedSet[i].j;
        x = x * side;
        y = y * side;
        p5.fill(4, 228, 226);
        p5.stroke(0);
        if (closedSet[i] === start) {
          p5.fill(233, 222, 21);
        } else if (closedSet[i] === end) {
          p5.fill(228, 31, 4);
        }
        p5.rect(x, y, side, side);
      }

      if (!noSolution && current) {
        path = [];
        path.push(current);
        while (current.prev) {
          path.push(current.prev);
          current = current.prev;
        }
      }

      for (let i = 0; i < path.length; i++) {
        let x = path[i].i;
        let y = path[i].j;
        x = x * side;
        y = y * side;
        p5.fill(0, 0, 255);
        p5.stroke(0);
        if (path[i] === start) {
          p5.fill(233, 222, 21);
        } else if (path[i] === end) {
          p5.fill(228, 31, 4);
        }
        p5.rect(x, y, side, side);
      }
    }

    if(noSolution){
      console.log("No Solution");
    }

  };

  mousePressed = (e) => {
    let x = e.mouseX;
    let y = e.mouseY;
    let i = Math.floor(x / side);
    let j = Math.floor(y / side);
    if (i >= 0 && j >= 0 && i < cols && j < rows && !grid[i][j].wall) {
      if (!this.state.start) this.setState({ start: grid[i][j], stage: 1 });
      else if (!this.state.end) this.setState({ end: grid[i][j], stage: 2 });
    }
  };

  removeFromArray(array, element) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === element) array.splice(i, 1);
    }
  }

  heuristic(i, j) {
    let x = this.state.end.i - i;
    let y = this.state.end.j - j;
    return Math.sqrt(x * x + y * y);
  }

  onBackButtonClick = () => {
    openSet = [];
    closedSet = [];
    noSolution = false;
    path = [];
    current = null;
    reLoad = false;
    noSolution = false;
    solution = false;
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    reLoad = true;
    this.setState({ start: null, end: null, stage: 0 });
  };

  render() {
    return (
      <div>
        <NavBar
          stage={this.state.stage}
          algo="A*"
          onBackButtonClick={this.onBackButtonClick}
          onClearButtonClick={this.onClearButtonClick}
        />
        <Sketch
          setup={this.setup}
          draw={this.draw}
          mousePressed={this.mousePressed}
        />
      </div>
    );
  }
}

export default AStar;
