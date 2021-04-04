export function getMergeSortAnimations(array){
  const animations = [];
  const auxArray = array.slice();
  mergesort(array, 0, array.length-1, auxArray, animations);
  return animations;
}

function mergesort(array, start, end, auxArray, animations){
  if(start === end)
    return;
  const mid = Math.floor((start + end)/2);
  mergesort(auxArray, start, mid, array, animations);
  mergesort(auxArray, mid+1, end, array, animations);
  merge(array, start, end, auxArray, animations);
}

function merge(array, start, end, auxArray, animations){
  const mid = Math.floor((start+end)/2);
  let i = start, j = mid+1, k = start;
  while(i <= mid && j <= end){
    animations.push([i, j]);
    animations.push([i, j]);
    if(auxArray[i] <= auxArray[j]){
      animations.push([k, auxArray[i]]);
      array[k++] = auxArray[i++];
    }
    else{  
      animations.push([k, auxArray[j]]);
      array[k++] = auxArray[j++];
    }
  }
  while(i <= mid){
    animations.push([i, i]);
    animations.push([i, i]);
    animations.push([k, auxArray[i]]);
    array[k++] = auxArray[i++];
  }
  while(j <= end){
    animations.push([j, j]);
    animations.push([j, j]);
    animations.push([k, auxArray[j]]);
    array[k++] = auxArray[j++];
  }
}