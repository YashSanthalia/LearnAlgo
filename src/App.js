import React from 'react';
import Dijkstra from "./Dijkstra/Dijkstra";
import BackTracking from "./BackTracking/BackTracking";
import AStar from "./AStar/AStar";
import Sorting from "./Sorting/Sorting";

class App extends React.Component{
    
    state = { option : 0 };

    render(){
        if(this.state.option === 0){
            return (
                <div>
                <button onClick={() => {this.setState({option : 1})}}>Dijkstra</button>   
                <button onClick={() => {this.setState({option : 2})}}>BackTracking</button>   
                <button onClick={() => {this.setState({option : 3})}}>A*</button>   
                <button onClick={() => {this.setState({option : 4})}}>Sorting</button>   
                </div>
            );
        }
        else if(this.state.option === 1){
            return (
                <Dijkstra/>
            )
        }
        else if(this.state.option === 2){
            return (
                <BackTracking/>
            )
        }
        else if(this.state.option === 3){
            return (
                <AStar/>
            )
        }
        else if(this.state.option === 4){
            return (
                <Sorting/>
            )
        }
    }
}

export default App;