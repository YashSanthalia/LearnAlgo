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
          <div className="container mt-3">
              <button onClick={this.generateNewArray} className="btn btn-primary">Generate Array</button>
              <BackButton onBackButtonClick={this.onBackButtonClick}/>
            <button class="b btn btn-outline-secondary" onClick={this.mergesort}>MergeSort</button>
            <button class="c btn btn-outline-success" onClick={this.bubblesort}>BubbleSort</button>
            <button class="d btn btn-outline-warning" onClick={this.selectionsort}>SelectionSort</button>
            <button class="e btn btn-outline-danger" onClick={this.insertionsort}>InsertionSort</button>
            <button class="f btn btn-outline-info" onClick={this.quicksort}>QuickSort</button>
          </div>
        );
    }
}

export default Menu;