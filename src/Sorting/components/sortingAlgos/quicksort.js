export function getQuickSortAnimations(array){
    const animations = [];
    quicksort(array, 0, array.length - 1, animations);
    return animations;
}

function quicksort(array, start, end, animations){
    if(start < end){
        const pIndex = randomisedPartition(array, start, end, animations);
        quicksort(array, start, pIndex-1, animations);
        quicksort(array, pIndex+1, end, animations);
    }
}

function randomisedPartition(array, start, end, animations){
    const k = Math.floor(Math.random() * (end-start+1)) + start;
    animations.push([k, array[end]]);
    animations.push([end, array[k]]);
    let temp = array[k];
    array[k] = array[end];
    array[end] = temp;
    return partition(array, start, end, animations);
}

function partition(array, start, end, animations){
    let pivot = array[end];
    let pIndex = start;
    for(let i = start ; i < end ; i++){
        if(array[i] < pivot){
            animations.push([i, array[pIndex]]);
            animations.push([pIndex, array[i]]);
            let temp = array[i];
            array[i] = array[pIndex];
            array[pIndex] = temp;
            pIndex++;
        }
    }
    animations.push([end, array[pIndex]]);
    animations.push([pIndex, array[end]]);
    array[end] = array[pIndex];
    array[pIndex] = pivot;
    return pIndex;
}