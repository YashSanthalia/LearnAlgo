import React from "react";
import Cell from "./Cell";
import Sketch from "react-p5";
import NavBar from "./components/NavBar";

let length, breadth;
let rows = 11, cols = 25;
let grid = [];
let current = null,
  next = null,
  start = null;
let stack = [];
let reLoad = false;
let solution = false;
let flag = true;
let xyz;

class BackTracking extends React.Component {
  state = { start: null, stage: 0 };

  componentDidMount() {
    grid = [];
    this.initializeGrid();
    current = this.state.start;
    start = this.state.start;
  }

  componentDidUpdate() {
    if (reLoad) {
      this.cleaning();
      this.initializeGrid();
    }
    current = this.state.start;
    start = this.state.start;
  }

  setup = (p5, canvasParentRef) => {
    xyz = p5.createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8).parent(canvasParentRef);
    p5.frameRate(15);
    this.initializeCanvas(p5);
  };

  windowResized = (p5) => {
    xyz = p5.createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.8);
    this.initializeCanvas(p5);
    if(solution){
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
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let cell = new Cell(i, j);
        grid.push(cell);
      }
    }
  };

  draw = (p5) => {
    if(flag === true){
      this.showGrid(p5);
    }
    if (!solution) {
      p5.background(0);
      this.showGrid(p5);
      if (current) {
        current.visited = true;
        p5.noStroke();
        p5.fill(21, 42, 233);
        p5.rect(current.i * length, current.j * breadth, length, breadth);
        next = this.checkNeighbours();
        if (next) {
          stack.push(current);
          this.removeWalls();
          current = next;
        } else if (stack.length > 0) {
          current = stack.pop();
        } else {
          solution = true;
        }
      }
    }
  };

  showGrid = (p5) => {
    for (let i = 0; i < grid.length; i++) {
      let x = grid[i].i;
      let y = grid[i].j;
      x = x * length;
      y = y * breadth;
      p5.noFill();
      p5.stroke(255);
      p5.strokeWeight(2);
      if (grid[i].walls[0]) {
        p5.line(x, y, x + length, y);
      }
      if (grid[i].walls[1]) {
        p5.line(x + length, y, x + length, y + breadth);
      }
      if (grid[i].walls[2]) {
        p5.line(x + length, y + breadth, x, y + breadth);
      }
      if (grid[i].walls[3]) {
        p5.line(x, y + breadth, x, y);
      }
      if (start === grid[i]) {
        p5.noStroke();
        p5.fill(255, 0, 0);
        p5.rect(x, y, length, breadth);
      } else if (grid[i].visited) {
        p5.noStroke();
        p5.fill(46, 240, 113);
        p5.rect(x, y, length+1, breadth+1);
      }
    }
  }

  mousePressed = (e) => {
    let x = e.mouseX;
    let y = e.mouseY;
    let i = Math.floor(x / length);
    let j = Math.floor(y / breadth);
    if (i >= 0 && j >= 0 && i < cols && j < rows) {
      if (!this.state.start)
        this.setState({ start: grid[j * cols + i], stage: 1 });
    }
  };

  checkNeighbours = () => {
    const i = current.i;
    const j = current.j;
    let neighbours = [];
    let top = grid[this.index(i, j - 1)];
    let right = grid[this.index(i + 1, j)];
    let bottom = grid[this.index(i, j + 1)];
    let left = grid[this.index(i - 1, j)];
    if (top && !top.visited) neighbours.push(top);
    if (right && !right.visited) neighbours.push(right);
    if (bottom && !bottom.visited) neighbours.push(bottom);
    if (left && !left.visited) neighbours.push(left);
    if (neighbours.length > 0) {
      return neighbours[Math.floor(Math.random() * neighbours.length)];
    } else return undefined;
  };

  removeWalls = () => {
    let x = current.i - next.i;
    let y = current.j - next.j;
    if (x < 0) {
      current.walls[1] = false;
      next.walls[3] = false;
    } else if (x > 0) {
      current.walls[3] = false;
      next.walls[1] = false;
    } else if (y > 0) {
      current.walls[0] = false;
      next.walls[2] = false;
    } else if (y < 0) {
      current.walls[2] = false;
      next.walls[0] = false;
    }
  };

  index = (i, j) => {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) return -1;
    return j * cols + i;
  };

  onBackButtonClick = () => {
    this.cleaning();
    this.props.onBackButtonClick();
  };

  cleaning = () => {
    grid = [];
    current = null;
    next = null;
    start = null;
    stack = [];
    reLoad = false;
    solution = false;
  }

  onClearButtonClick = () => {
    reLoad = true;
    this.setState({ start: null, stage: 0 });
  };

  render() {
    return (
      <div className="container mb-3">
        <NavBar
          stage={this.state.stage}
          algo="BackTracking"
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

export default BackTracking;