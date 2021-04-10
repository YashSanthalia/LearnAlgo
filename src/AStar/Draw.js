export function showingCompleteGrid(p5, grid, length, breadth, rows, cols, start, end){
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          let x = i * length;
          let y = j * breadth;
          p5.fill(255);
          p5.stroke(0);
          if (grid[i][j].wall) {
            p5.fill(0);
          }
          if (grid[i][j] === start) {
            p5.fill(233, 222, 21);
          }
          if (grid[i][j] === end) {
            p5.fill(228, 31, 4);
          }
          p5.rect(x, y, length, breadth);
        }
      }
}

export function showingOpenSet(p5, openSet, length, breadth, start, end){
    for (let i = 0; i < openSet.length; i++) {
        let x = openSet[i].i;
        let y = openSet[i].j;
        x = x * length;
        y = y * breadth;
        p5.fill(139, 237, 151);
        p5.stroke(0);
        if (openSet[i] === start) {
          p5.fill(233, 222, 21);
        }
        if (openSet[i] === end) {
          p5.fill(228, 31, 4);
        }
        p5.rect(x, y, length, breadth);
      }
}

export function showingclosedSet(p5, closedSet, length, breadth, start, end){
    for (let i = 0; i < closedSet.length; i++) {
        let x = closedSet[i].i;
        let y = closedSet[i].j;
        x = x * length;
        y = y * breadth;
        p5.fill(4, 228, 226);
        p5.stroke(0);
        if (closedSet[i] === start) {
          p5.fill(233, 222, 21);
        } else if (closedSet[i] === end) {
          p5.fill(228, 31, 4);
        }
        p5.rect(x, y, length, breadth);
      }
}

export function showingPath(p5, path, length, breadth, start, end){
    for (let i = 0; i < path.length; i++) {
      let x = path[i].i;
      let y = path[i].j;
      x = x * length;
      y = y * breadth;
      p5.fill(0, 0, 255);
      p5.stroke(0);
      if (path[i] === start) {
        p5.fill(233, 222, 21);
      } else if (path[i] === end) {
        p5.fill(228, 31, 4);
      }
      p5.rect(x, y, length, breadth);
    }
  }