const ANIMATION_SPEED_MS = 2;
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';

export function animateBubbleSort(animations){
    const arrayBars = document.getElementsByClassName('array-bar');
      for(let i = 0 ; i < animations.length ; i++){
        const [barOneIdx, barTwoIdx, decider] = animations[i];
        if(decider === 0){
            const barOneStyle = arrayBars[barOneIdx].style;
            const barTwoStyle = arrayBars[barTwoIdx].style;
            setTimeout(() => {
              barOneStyle.backgroundColor = SECONDARY_COLOR;
              barTwoStyle.backgroundColor = SECONDARY_COLOR;
            }, i * ANIMATION_SPEED_MS);
        }
        else if(decider === 2){
          const barOneStyle = arrayBars[barOneIdx].style;
          const barTwoStyle = arrayBars[barTwoIdx].style;
          setTimeout(() => {
            barOneStyle.backgroundColor = PRIMARY_COLOR;
            barTwoStyle.backgroundColor = PRIMARY_COLOR;
          }, i*ANIMATION_SPEED_MS);
        }
        else{
            const newHeight = barTwoIdx;
            const barOneStyle = arrayBars[barOneIdx].style;
            setTimeout(() => {
              barOneStyle.backgroundColor= 'blue';
              barOneStyle.height = `${newHeight}px`;
              barOneStyle.backgroundColor = PRIMARY_COLOR;
            }, i*ANIMATION_SPEED_MS);
        }
      }
}