import React from 'react';

class NavBar extends React.Component{
    render(){
        if(this.props.stage === 0){
        return (
            <div>Click from where you want to start</div>
        );
        }
        else{
            return (
                <div></div>
            );  
        }
    }
}

export default NavBar;