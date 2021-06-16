import React from "react";
import Sketch from "react-p5";
import NavBar from "../linearsearch/NavBar";

let array = [];
let n = 30;
let length, breadth;
let key = null;
let found = false;
let reLoad = false;
let lo, hi, mid;
let xyz;
let flag = false;

class BinarySearch extends React.Component {
  state = { key: null, stage: 0 };

  componentDidMount() {
    lo = 0;
    hi = n - 1;
    this.resetArray();
    key = this.state.key;
  }

  componentDidUpdate() {
    if (reLoad) {
      reLoad = false;
      this.resetArray();
    }
    key = this.state.key;
  }

  resetArray() {
    for (let i = 0; i < n; i++) {
      array.push(Math.floor(Math.random() * 100 + 1));
      array.sort((a, b) => a - b);
    }
    key = array[Math.floor(Math.random() * 19)];
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
  };

  initializeCanvas = (p5) => {
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    length = p5.width / n;
    breadth = p5.height * 0.9;
  };

  draw = (p5) => {
    if(flag == true){
      this.showArray(p5);
    }
    if (!found && lo <= hi) {
      p5.background(255);
      this.showArray(p5);
      if (key) {
        mid = Math.floor((lo + hi) / 2);
        if (array[mid] == key) {
          found = true;
          p5.fill(255, 0, 0);
          p5.rect(mid * length, 0, length, breadth);
          p5.fill(0);
          p5.textSize((length + breadth) / 6);
          p5.text(array[mid], mid * length + (9 * length) / 24, (7 * breadth) / 12);
        } else if (array[mid] > key) {
          hi = mid - 1;
        } else if (array[mid] < key) {
          lo = mid + 1;
        }
      }
    }
    else if(!found){
      console.log("Not Found");
      this.showArray(p5);
    }
  };

  showArray = (p5) => {
    for (let i = 0; i < n; i++) {
      if(array[i] == key){
        p5.fill(255, 0, 0);
      }
      else if(i >= lo && i <= hi) {
        p5.fill(0, 255, 0);
      } else{
        p5.fill(255);
      }
      p5.stroke(0);
      p5.rect(i * length, 0, length, breadth);
      p5.fill(0);
      p5.textSize((length + breadth) / 6);
      p5.text(array[i], i * length + (6 * length) / 24, (15 * breadth) / 24);
    }
  };

  onBackButtonClick = () => {
    this.cleaning();
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    this.cleaning();
    reLoad = true;
    this.setState({ key: null, stage: 0 });
  };

  cleaning = () => {
    array = [];
    lo = 0;
    hi = n - 1;
    found = false;
  }

  onSearchButtonClick = () => {
    let n = document.getElementById("key").value;
    console.log(n);
    if(this.state.key === null){
      this.setState({key : n, stage : 1});
    }
  };

  render() {
    return (
      <div className="container">
        <NavBar
          stage={this.state.stage}
          algo="Binary Search"
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

export default BinarySearch;