import React from 'react';
import SortingVisualizer from './components/SortingVisualizer';
import "./css/app.css";


class Sorting extends React.Component{
    state = {array : []};

    componentDidMount(){
        this.resetArray();
    }

    resetArray = () => {
        const array = [];
        for(let i = 0 ;  i < 100 ; i++){
            array.push(Math.floor(Math.random() * 300) + 20);
        }
        this.setState({array});
    }

    render(){
        return (
            <div className="ui container">
                <SortingVisualizer array={this.state.array} onGenerateNewArray={this.resetArray}/>
            </div>
        );
    }
}

export default Sorting;