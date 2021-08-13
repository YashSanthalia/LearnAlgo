class Cell{
    constructor(i, j){
        this.i=i;
        this.j=j;
        this.visited = false;
        this.walls = [true, true, true, true];
    }
}

export default Cell;