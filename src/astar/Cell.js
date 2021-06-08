class Cell{
    constructor(i, j, rows, cols){
        this.f = 0;
        this.g = 0;
        this.h = 0;
        this.i = i;
        this.j = j;
        this.rows = rows;
        this.cols = cols;
        this.neighbours = [];
        this.prev = undefined;
        this.wall = false;
        if(Math.random(1) < 0.4)
            this.wall = true;
    }
    addNeighbours(){
        let i = this.i;
        let j = this.j;
        let rows = this.rows;
        let cols = this.cols;
        if(i > 0)
            this.neighbours.push([i-1, j]);
        if(i < cols-1)
            this.neighbours.push([i+1, j]);
        if(j > 0)
            this.neighbours.push([i, j-1]);
        if(j < rows-1)
            this.neighbours.push([i, j+1]);
        if(i > 0 && j > 0)
            this.neighbours.push([i-1, j-1]);
        if(i > 0 && j < rows - 1)
            this.neighbours.push([i-1, j+1]);
        if(i < cols- 1 && j > 0)
            this.neighbours.push([i+1, j-1]);
        if(i < cols-1 && j < rows-1)
            this.neighbours.push([i+1, j+1]);
    }
}

export default Cell;