import React from 'react';
import { getMergeSortAnimations } from "./sortingAlgos/mergesort";
import { getBubbleSortAnimations } from "./sortingAlgos/bubblesort";
import { getSelectionSortAnimations } from "./sortingAlgos/selectionsort";
import { getInsertionSortAnimations } from "./sortingAlgos/insertionsort";
import { getQuickSortAnimations } from "./sortingAlgos/quicksort";
import { animateMergeSort } from "./animations/mergesort_animations";
import { animateBubbleSort } from "./animations/bubblesort_animations";
import { animateSelectionSort } from "./animations/selectionsort_animations";
import { animateQuickSort } from "./animations/quicksort_animations";
import { animateInsertionSort } from "./animations/insertionsort_animations";
import BackButton from '../../utility_components/BackButton';
import "../css/button.css";

class Menu extends React.Component{

    generateNewArray = () => {
        this.props.onGenerateNewArray();
      };
    
      mergesort = () => {
        const animations = getMergeSortAnimations(this.props.array);
        animateMergeSort(animations);
      };

      bubblesort = () => {
        const animations = getBubbleSortAnimations(this.props.array);
        animateBubbleSort(animations);
      };
    
      selectionsort = () => {
        const animations = getSelectionSortAnimations(this.props.array);
        animateSelectionSort(animations);
      };
    
      insertionsort = () => {
        const animations = getInsertionSortAnimations(this.props.array);
        animateInsertionSort(animations);
      };
    
      quicksort = () => {
        const animations = getQuickSortAnimations(this.props.array);
        animateQuickSort(animations);
      };

      onBackButtonClick = () => {
        this.props.onBackButtonClick();
      }
      
    render(){
        return (
          <div>
            <div class="a">
              <button onClick={this.generateNewArray}>Generate Array</button>
              <BackButton onBackButtonClick={this.onBackButtonClick}/>
            </div>
            <button class="b" onClick={this.mergesort}>MergeSort</button>
            <button class="c" onClick={this.bubblesort}>BubbleSort</button>
            <button class="d" onClick={this.selectionsort}>SelectionSort</button>
            <button class="e" onClick={this.insertionsort}>InsertionSort</button>
            <button class="f" onClick={this.quicksort}>QuickSort</button>
          </div>
        );
    }
}

export default Menu;