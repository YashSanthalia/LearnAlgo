import React from "react";
import Cell from "./Cell";
import Sketch from "react-p5";

const side = 20;
let rows, cols;
let grid = [];
let current, next;
let stack = [];

class BackTracking extends React.Component {
  setup = (p5, canvasParentRef) => {
    let xyz = p5.createCanvas(500, 500).parent(canvasParentRef);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    p5.frameRate();
    rows = p5.width / side;
    cols = p5.width / side;
    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let cell = new Cell(i, j);
        grid.push(cell);
      }
    }
    current = grid[0];
  };

  draw = (p5) => {
    p5.background(2);
    for (let i = 0; i < grid.length; i++) {
      let x = grid[i].i;
      let y = grid[i].j;
      x = x * side;
      y = y * side;
      p5.stroke(255);
      p5.noFill();
      if (grid[i].walls[0]) {
        p5.line(x, y, x + side, y);
      }
      if (grid[i].walls[1]) {
        p5.line(x + side, y, x + side, y + side);
      }
      if (grid[i].walls[2]) {
        p5.line(x + side, y + side, x, y + side);
      }
      if (grid[i].walls[3]) {
        p5.line(x, y + side, x, y);
      }
      if (grid[i].visited) {
        p5.noStroke();
        p5.fill(255, 0, 255, 100);
        p5.rect(x, y, side, side);
      }
    }
    current.visited = true;
    p5.noStroke();
    p5.fill(0, 0, 255, 100);
    p5.rect(current.i * side, current.j * side, side, side);
    next = this.checkNeighbours();
    console.log(next);
    if(next){
      stack.push(current);
      this.removeWalls();
      current = next;
    } 
    else if(stack.length > 0){
      current = stack.pop();
    }
    else{
      p5.noLoop();
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
      return neighbours[Math.floor(Math.random() * (neighbours.length))];
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
    return (j * cols + i);
  };

  render() {
    return (
      <div>
        <h1>Maze Generator Using DFS</h1>
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default BackTracking;
