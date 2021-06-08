export function getInsertionSortAnimations(array){
    const animations = [];
    insertionsort(array, animations);
    return animations;
}

function insertionsort(array, animations){
    const n = array.length - 1;
    for(let i = 1 ; i <= n ; i++){
        animations.push([i, -1]);
        animations.push([i, -2]);
        let temp = array[i], j = i-1;
        for( ; j >= 0 ; j--){
            animations.push([j, -1]);
            animations.push([j, -2]);
            if(array[j] > temp){
                animations.push([j+1, array[j]]);
                array[j+1] = array[j];
            }
            else
                break;
        }
        animations.push([j+1, temp]);
        array[j+1] = temp;
    }
}