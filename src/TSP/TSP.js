import React from "react";
import Sketch from "react-p5";
import Point from "./Point";
import NavBar from "./NavBar";
import {initializePopulation} from "./GeneticAlgo";
import {calcFitness} from "./GeneticAlgo";
import {getCurrentBest} from "./GeneticAlgo";
import {nextGeneration} from "./GeneticAlgo";

let points = [];
const width = 1000;
const height = 500;
let bestFitness = -1;
let bestPath = [];
let order = [];
let complete = false;
let flag = false;
let population = [];
let fitness = [];
let populationSize = 1000;



class TSP extends React.Component {
  state = { stage: 0 };

  componentDidUpdate = () => {
    initializePopulation(population, order, populationSize);
  };

  setup = (p5, parent) => {
    let xyz = p5.createCanvas(width, height).parent(parent);
    let x = (p5.windowWidth - p5.width) / 2;
    let y = (p5.windowHeight - p5.height) / 2;
    xyz.position(x, y);
  };

  draw = (p5) => {
    if (!complete) {
      p5.background(0);
      if (this.state.stage === 0) {
        p5.noStroke();
        p5.fill(255);
        p5.noCursor();
        p5.ellipse(p5.mouseX, p5.mouseY, 12);
      }
      this.showPoints(p5);
      if (this.state.stage === 1) {
        calcFitness(points, population, fitness);
        let currentBestIndex= getCurrentBest(fitness);
        let currentBestFitness = fitness[currentBestIndex];
        let currentBestPath = population[currentBestIndex];
        this.showLines(currentBestPath, p5, 255, 255, 255, 0.5);
        if (currentBestFitness > bestFitness) {
          bestFitness = currentBestFitness;
          bestPath = currentBestPath;
        }
        this.showLines(bestPath, p5, 255, 0, 255, 6);
        population = nextGeneration(population, fitness);
      }
    } else if (!flag) {
        this.showFinalPath(p5);
    }
  };

  showFinalPath = (p5) => {
    p5.background(0);
    this.showPoints(p5);
    this.showLines(bestPath, p5, 255, 0, 255, 6);
    flag = true;
  };

  calcPathDistance = (p5) => {
    let dist = 0;
    for (let i = 1; i < order.length; i++) {
      dist += p5.dist(
        points[order[i]].x,
        points[order[i]].y,
        points[order[i - 1]].x,
        points[order[i - 1]].y
      );
    }
    return dist;
  };

  swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }

  showLines = (order, p5, r, g, b, strokeWeight) => {
    p5.beginShape();
    p5.stroke(r, g, b);
    p5.strokeWeight(strokeWeight);
    p5.noFill();
    for (let i = 0; i < order.length; i++) {
      p5.vertex(points[order[i]].x, points[order[i]].y);
    }
    p5.endShape();
  };

  showPoints = (p5) => {
    for (let i = 0; i < points.length; i++) {
      p5.fill(points[i].r, points[i].g, points[i].b);
      p5.ellipse(points[i].x, points[i].y, 25, 25);
    }
  };

  mousePressed = (e) => {
    if (this.state.stage === 0) {
      let x = e.mouseX;
      let y = e.mouseY;
      if (x > 0 && x < width && y > 0 && y < height) {
        points.push(new Point(x, y));
      }
    }
  };

  onBackButtonClick = () => {
    this.cleaning();
    this.props.onBackButtonClick();
  };

  onClearButtonClick = () => {
    this.cleaning();
    this.setState({ stage: 0 });
  };

  cleaning = () => {
    bestFitness = -1;
    bestPath = [];
    points = [];
    order = [];
    complete = false;
  };

  onStartButtonClick = () => {
    order = [];
    for (let i = 0; i < points.length; i++) {
      order.push(i);
    }
    this.setState({ stage: 1 });
  };

  render() {
    return (
      <div>
        <NavBar
          stage={this.state.stage}
          onBackButtonClick={this.onBackButtonClick}
          onClearButtonClick={this.onClearButtonClick}
          onStartButtonClick={this.onStartButtonClick}
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

export default TSP;