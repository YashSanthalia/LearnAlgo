import React from "react";
import BackButton from "../utility_components/BackButton";
import ClearButton from "../utility_components/ClearButton";
import StartButton from "../utility_components/StartButton";

class NavBar extends React.Component{
    onBackButtonClick = () => {
        this.props.onBackButtonClick();
    }
    onClearButtonClick = () => {
        this.props.onClearButtonClick();
    }
    onStartButtonClick = () => {
        this.props.onStartButtonClick();
    }
    render(){
        if(this.props.stage === 0){
            return (
                <div>
                    <h2>MST - Minimum Spanning Tree</h2>
                   <span className="fs-5">Choose the points</span> 
                    <StartButton onStartButtonClick={this.onStartButtonClick}/>
                    <BackButton onBackButtonClick={this.onBackButtonClick}/>
                    <ClearButton onClearButtonClick={this.onClearButtonClick}/>
                </div>

            );
        }
        else if(this.props.stage === 1){
            return (
                <div>
                    <h2>MST - Minimum Spanning Tree</h2>
                    <BackButton onBackButtonClick={this.onBackButtonClick}/>
                    <ClearButton onClearButtonClick={this.onClearButtonClick}/>
                </div>
            );
        }
    }
}

export default NavBar;