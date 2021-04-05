import React from "react";
import Sketch from "react-p5";
import NavBar from "./NavBar";

let array = [];
let visited = [];
let n;
let side = 50;
let key = null;
let index = 0;
let found = false;
let reLoad = false;

class LinearSearch extends React.Component {
  state = { key: null, stage: 0 };
  componentDidMount() {
    this.resetArray();
    key = this.state.key;
  }

  componentDidUpdate() {
    if (reLoad) {
        this.resetArray();
        reLoad = false;
    }
    key = this.state.key;
  }

  resetArray() {
    for (let i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 50 + 1));
    }
    for (let i = 0; i < n; i++) {
      visited.push(false);
    }
  }

  setup = (p5, parent) => {
    let xyz = p5.createCanvas(1000, 80);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    p5.frameRate(1);
    n = p5.width / side;
  };

  draw = (p5) => {
    if (!found && index < 21) {
      p5.background(255);
      for (let i = 0; i < n; i++) {
        if (!visited[i]) {
          p5.fill(4, 228, 221);
        } else {
          p5.fill(0, 0, 255);
        }
        p5.stroke(0);
        p5.rect(i * side, 0, side, side);
        p5.fill(0);
        p5.textSize(15);
        p5.text(array[i], i * side + (9 * side) / 24, (7 * side) / 12);
      }
      if (key) {
        if (index !== -1) {
          if (array[index] == key) {
            p5.fill(255, 0, 0);
            found = true;
          } else {
            visited[index] = true;
            p5.fill(0, 255, 0);
          }
        }
        p5.rect(index * side, 0, side, side);
        p5.fill(0);
        p5.textSize(15);
        p5.text(array[index], index * side + (9 * side) / 24, (7 * side) / 12);
        index = index + 1;
      }
    }
    else if(index == 21 && !found){
      console.log("Not found");
      found = true;
    }
  };

  onBackButtonClick = () => {
    array = [];
    visited = [];
    index = 0;
    found = false;
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    array = [];
    visited = [];
    index = 0;
    found = false;
    reLoad = true;
    this.setState({key : null, stage : 0});
  };

  onSearchButtonClick = () => {
    let n = document.getElementById("key").value;
    console.log(n)
    if(this.state.key === null){
      this.setState({key : n, stage : 1});
    }
  };

  render() {
    return (
      <div>
        <NavBar
          stage={this.state.stage}
          onBackButtonClick={this.onBackButtonClick}
          onClearButtonClick={this.onClearButtonClick}
          onSearchButtonClick = {this.onSearchButtonClick}
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

export default LinearSearch;
