import React from "react";
import Sketch from "react-p5";
import Cell from "./Cell";

let cols, rows;
const side = 10;
let grid = new Array(cols);
let openSet = [];
let closedSet = [];
let start, end, current;
let noSolution = false;
let path = [];

class AStar extends React.Component {
  setup = (p5, parent) => {
    let xyz = p5.createCanvas(500, 500).parent(parent);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    // p5.frameRate(5);
    cols = p5.width / side;
    rows = p5.height / side;
    for (let i = 0; i < cols; i++) {
      grid[i] = new Array(rows);
    }

    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        grid[i][j] = new Cell(i, j);
        grid[i][j].addNeighbours();
      }
    }
    start = grid[0][0];
    end = grid[cols - 1][rows - 1];
    start.wall = false;
    end.wall = false;
    openSet.push(start);
  };

  draw = (p5) => {
    p5.background(0);
    if (openSet.length > 0) {
      let lowestIndex = 0;
      for (let i = 0; i < openSet.length; i++) {
        if (openSet[i].f < openSet[lowestIndex].f) lowestIndex = i;
      }
      current = openSet[lowestIndex];
      if (current === end) {
        p5.noLoop();
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
            }
          } else {
            neighbour.g = tempG;
            openSet.push(neighbour);
            neighbour.prev = current;
          }
          neighbour.f = neighbour.g + neighbour.h;
        }
      }
    } else {
      noSolution = true;
      p5.noLoop();
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
        p5.rect(x, y, side, side);
      }
    }

    for (let i = 0; i < openSet.length; i++) {
      let x = openSet[i].i;
      let y = openSet[i].j;
      x = x * side;
      y = y * side;
      p5.fill(0, 255, 0);
      p5.stroke(0);
      if (openSet[i].wall) {
        p5.fill(0);
        p5.stroke(0);
      }
      p5.rect(x, y, side, side);
    }

    for (let i = 0; i < closedSet.length; i++) {
      let x = closedSet[i].i;
      let y = closedSet[i].j;
      x = x * side;
      y = y * side;
      p5.fill(255, 0, 0);
      p5.stroke(0);
      if (closedSet[i].wall) {
        p5.fill(0);
        p5.stroke(0);
      }
      p5.rect(x, y, side, side);
    }
    if (!noSolution) {
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
      p5.rect(x, y, side, side);
    }
  };

  removeFromArray(array, element) {
    for (let i = array.length - 1; i >= 0; i--) {
      if (array[i] === element) array.splice(i, 1);
    }
  }

  render() {
    return (
      <div>
        <h2>A Star Algorithm</h2>
        <Sketch setup={this.setup} draw={this.draw} />
      </div>
    );
  }
}

export default AStar;
