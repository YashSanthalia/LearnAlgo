class Cell{
    constructor(i, j, rows, cols){
        this.i=i;
        this.j=j;
        this.visited = false;
        this.walls = [true, true, true, true];
    }
}

export default Cell;