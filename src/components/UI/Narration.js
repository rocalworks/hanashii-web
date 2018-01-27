import React from 'react';
import LineType from './LineType';


class Narration extends LineType {
    
    toHTML() {
        var raw = this.props.content.split("\n");
        var rawHTML = [];
        
        for(var i = 0; i < raw.length; i++) {
            rawHTML.push(raw[i]);
        }
        
        var html = (
            <p className="narration-item"> {rawHTML} </p>
        );
    
        
        this.setState({ html: html });
    }
    
}

export default Narration;