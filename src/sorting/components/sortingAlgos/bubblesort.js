export function getBubbleSortAnimations(array){
    const animations = [];
    bubblesort(array, animations);
    return animations;
}

function bubblesort(array, animations){
    const n = array.length - 1;
    for(let i = 0 ;  i < n ; i++){
        for(let j = 0 ; j < n - i ; j++){
            animations.push([j, j+1, 0]);
            animations.push([j, j+1, 2]);
            if(array[j] > array[j+1]){
                animations.push([j, array[j+1], 1]);
                animations.push([j+1, array[j], 1]);
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
            }
        }
    }
}