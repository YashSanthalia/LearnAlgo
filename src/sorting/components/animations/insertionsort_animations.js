const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export function animateInsertionSort(animations){
    const arrayBars = document.getElementsByClassName('array-bar');
      for(let i = 0 ;  i < animations.length ; i++){
        const [barOneIdx, newHeight] = animations[i];
        if(newHeight === -1){
          const barOneStyle = arrayBars[barOneIdx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = SECONDARY_COLOR;
          }, i*ANIMATION_SPEED_MS);
        }
        else if(newHeight === -2){
          const barOneStyle = arrayBars[barOneIdx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
          }, i*ANIMATION_SPEED_MS);
        } 
        else{
          const barOneStyle = arrayBars[barOneIdx].style;
          setTimeout(() => {
            barOneStyle.height = `${newHeight}px`;
          }, i*ANIMATION_SPEED_MS);
        }
      }
}