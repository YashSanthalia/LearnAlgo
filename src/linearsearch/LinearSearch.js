import React from "react";
import Sketch from "react-p5";
import NavBar from "./NavBar";

let array = [];
let visited = [];
let n = 30;
let length, breadth;
let key = null;
let index = 0;
let found = false;
let reLoad = false;
let xyz;
let flag = false;

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
      array.push(Math.floor(Math.random() * 100 + 1));
    }
    for (let i = 0; i < n; i++) {
      visited.push(false);
    }
  }

  setup = (p5, parent) => {
    xyz = p5.createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.09).parent(parent);
    p5.frameRate(5);
    this.initializeCanvas(p5);
  };

  windowResized = (p5) => {
    xyz = p5.createCanvas(p5.windowWidth * 0.95, p5.windowHeight * 0.09);
    this.initializeCanvas(p5);
    if(found){
      flag = true;
    }
  }

  initializeCanvas = (p5) => {
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    length = p5.width / n;
    breadth = p5.height * 0.9;
    console.log(length);
    console.log(breadth);
  };

  draw = (p5) => {
    if(flag){
      this.showArray(p5);

    }
    if (!found && (index < n+1)) {
      p5.background(255);
      this.showArray(p5);
      if (key) {
        if (index !== -1) {
          if (array[index] == key) {
            p5.fill(255, 0, 0);
            visited[index] = true;
            found = true;
          } else {
            visited[index] = true;
            p5.fill(0, 255, 0);
          }
        }
        p5.rect(index * length, 0, length, breadth);
        p5.fill(0);
        p5.textSize((length + breadth) / 6);
        p5.text(array[index], index * length + (6 * length) / 24, (15 * breadth) / 24);
        index = index + 1;
      }
    }
    else if(index == 21 && !found){
      console.log("Not found");
      found = true;
    }
  };

  showArray = (p5) => {
    for (let i = 0; i < n; i++) {
      if (!visited[i]) {
        p5.fill(4, 228, 221);
      }
      else if(flag && array[i] == key){
        console.log(1);
        p5.fill(255, 0, 0);
      }
      else {
        p5.fill(0, 0, 255);
      }
      p5.stroke(0);
      p5.rect(i * length, 0, length, breadth);
      p5.fill(0);
      p5.textSize((length + breadth) / 6);
      p5.text(array[i], i * length + (6 * length) / 24, (15 * breadth) / 24);
    }

  }

  onBackButtonClick = () => {
    this.cleaning();
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    this.cleaning();
    reLoad = true;
    this.setState({key : null, stage : 0});
  };

  cleaning = () => {
    array = [];
    visited = [];
    index = 0;
    found = false;
  }

  onSearchButtonClick = () => {
    let n = document.getElementById("key").value;
    if(this.state.key === null){
      this.setState({key : n, stage : 1});
    }
  };

  render() {
    return (
      <div className="container mb-3">
        <NavBar
          stage={this.state.stage}
          algo="Linear Search"
          onBackButtonClick={this.onBackButtonClick}
          onClearButtonClick={this.onClearButtonClick}
          onSearchButtonClick = {this.onSearchButtonClick}
        />
        <Sketch
          setup={this.setup}
          draw={this.draw}
          mousePressed={this.mousePressed}
          windowResized={this.windowResized}
        />
      </div>
    );
  }
}

export default LinearSearch;