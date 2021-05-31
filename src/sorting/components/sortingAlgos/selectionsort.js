export function getSelectionSortAnimations(array){
    const animations = [];
    selectionsort(array, animations);
    return animations;
}

function selectionsort(array, animations){
    const n = array.length;
    for(let i = 0 ; i < n-1 ; i++){
        let maxi = array[0], k = 0;
        for(let j = 0 ;  j < n-i ; j++){
            animations.push([j, -1]);
            animations.push([j, -2]);
            if(maxi < array[j]){
                maxi = array[j];
                k = j;
            }
        }
        animations.push([k, array[n-i-1]]);
        animations.push([n-i-1, array[k]]);
        let temp = array[k];
        array[k] = array[n-i-1];
        array[n-i-1] = temp;
    }
}