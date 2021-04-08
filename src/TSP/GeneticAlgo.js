export function initializePopulation(population, order, populationSize) {
  for (let i = 0; i < populationSize; i++) {
    population[i] = shuffle(order);
  }
}

function shuffle(order) {
  let array = order.slice();
  array.sort(() => Math.random() - 0.5);
  return array;
}

export function calcFitness(points, population, fitness) {
  for (let i = 0; i < population.length; i++) {
    let d = calcDist(points, population[i]);
    fitness[i] = 1 / (d + 0.1);
  }
  normalizeFitness(fitness);
}

function normalizeFitness(fitness) {
  let totalFitness = 0;
  for (let i = 0; i < fitness.length; i++) {
    totalFitness += fitness[i];
  }
  for (let i = 0; i < fitness.length; i++) {
    fitness[i] = fitness[i] / totalFitness;
  }
}

function calcDist(points, order) {
  let sum = 0;
  for (let i = 1; i < order.length; i++) {
    let x1 = points[order[i]].x;
    let y1 = points[order[i]].y;
    let x2 = points[order[i - 1]].x;
    let y2 = points[order[i - 1]].y;
    let x = x1 - x2;
    let y = y1 - y2;
    let d = Math.sqrt(x * x + y * y);
    sum += d;
  }
  return sum;
}

export function getCurrentBest(fitness) {
  let index = -1;
  let best = -1;
  for (let i = 0; i < fitness.length; i++) {
    if (fitness[i] > best) {
      best = fitness[i];
      index = i;
    }
  }
  return index;
}

export function nextGeneration(population, fitness) {
  let newPopulation = [];
  for (let i = 0; i < population.length; i++) {
    let order1 = getOne(population, fitness);
    let order2 = getOne(population, fitness);
    let newOrder = crossOver(order1, order2);
    newOrder = mutate(newOrder, 0.01);
    newPopulation.push(newOrder);
  }
  return newPopulation;
}

function getOne(list, prob) {
  var index = 0;
  var r = Math.random(1);

  while (r > 0) {
    r = r - prob[index];
    index++;
  }
  index--;
  return list[index].slice();
}

function crossOver(order1, order2) {
  var start = Math.floor(Math.random(1) * order1.length);
  var end = Math.floor(
    Math.random(1) * (order1.length - (start + 1) + 1) + start + 1
  );
  var temp = order1.slice(start, end);
  let newOrder = [];
  for (let i = 0; i < order1.length; i++) {
    newOrder[i] = Infinity;
  }
  for (let i = start; i < end; i++) {
    newOrder[i] = order1[i];
  }
  let j = 0;
  for (let i = 0; i < order2.length; i++) {
    var idx = order2[i];
    if (j === start) j = end;
    if (!temp.includes(idx)) {
      newOrder[j++] = idx;
    }
  }
  return newOrder;
}

function mutate(order, mutationRate) {
  if (Math.random(1) < mutationRate) {
    var indexA = Math.floor(Math.random(1) * order.length);
    var indexB = (indexA + 1) % order.length;
    order = swap(order, indexA, indexB);
  }
  return order;
}

function swap(order, i, j) {
  let temp = order[i];
  order[i] = order[j];
  order[j] = temp;
  return order;
}
