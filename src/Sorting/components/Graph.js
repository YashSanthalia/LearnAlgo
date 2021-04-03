import React from 'react'
import '../css/graph.css'

const PRIMARY_COLOR = 'turquoise';

const Graph = (props) => {

    const graph = props.array.map((num, id) => {
        return <div key={id} className="array-bar"  style={{
            backgroundColor: PRIMARY_COLOR,
            height: `${num}px`,
          }}></div>
    });

    return (
        <div className="array-container"> 
            {graph}
        </div>
    );
}

export default Graph;