import React from "react";
import Sketch from "react-p5";
import NavBar from "../LinearSearch/NavBar";

let array = [];
let n;
let side = 50;
let key = null;
let found = false;
let reLoad = false;
let lo, hi, mid;

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
      reLoad = false;
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
    let xyz = p5.createCanvas(1000, 50);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
    p5.frameRate(1);
    n = p5.width / side;
  };

  draw = (p5) => {
    if (!found && lo <= hi) {
      p5.background(255);
      for (let i = 0; i < n; i++) {
        if (i >= lo && i <= hi) {
          p5.fill(0, 255, 0);
        } else{
          p5.fill(255);
        }
        p5.stroke(0);
        p5.rect(i * side, 0, side, side);
        p5.fill(0);
        p5.textSize(15);
        p5.text(array[i], i * side + (9 * side) / 24, (7 * side) / 12);
      }
      if (key) {
        mid = Math.floor((lo + hi) / 2);
        if (array[mid] == key) {
          found = true;
          p5.fill(255, 0, 0);
          p5.rect(mid * side, 0, side, side);
          p5.fill(0);
          p5.textSize(15);
          p5.text(array[mid], mid * side + (9 * side) / 24, (7 * side) / 12);
        } else if (array[mid] > key) {
          hi = mid - 1;
        } else if (array[mid] < key) {
          lo = mid + 1;
        }
      }
    }
    else if(!found){
      console.log("Not Found");
      for (let i = 0; i < n; i++) {
        if (i >= lo && i <= hi) {
          p5.fill(0, 255, 0);
        } else{
          p5.fill(255);
        }
        p5.stroke(0);
        p5.rect(i * side, 0, side, side);
        p5.fill(0);
        p5.textSize(15);
        p5.text(array[i], i * side + (9 * side) / 24, (7 * side) / 12);
      }
      found = true;
    }
  };

  onBackButtonClick = () => {
    array = [];
    lo = 0;
    hi = n - 1;
    found = false;
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    array = [];
    lo = 0;
    hi = n - 1;
    found = false;
    reLoad = true;
    this.setState({ key: null, stage: 0 });
  };

  // mousePressed = (e) => {
  //   let x = e.mouseX;
  //   let y = e.mouseY;
  //   let i = Math.floor(x / side);
  //   let j = Math.floor(y / side);
  //   if (!key && i >= 0 && i < n && j == 0) {
  //     this.setState({ key: array[i], stage: 1 });
  //   }
  // };

  onSearchButtonClick = () => {
    let n = document.getElementById("key").value;
    console.log(n);
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

export default BinarySearch;
