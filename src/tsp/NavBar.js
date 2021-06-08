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
                    Choose the points
                    <BackButton onBackButtonClick={this.onBackButtonClick}/>
                    <ClearButton onClearButtonClick={this.onClearButtonClick}/>
                    <StartButton onStartButtonClick={this.onStartButtonClick}/>
                </div>

            );
        }
        else if(this.props.stage === 1){
            return (
                <div>
                    <BackButton onBackButtonClick={this.onBackButtonClick}/>
                    <ClearButton onClearButtonClick={this.onClearButtonClick}/>
                </div>
            );
        }
    }
}

export default NavBar;