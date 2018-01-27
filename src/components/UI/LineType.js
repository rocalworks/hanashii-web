// Super class of all line types in the app
import React, { Component } from 'react';
import './../../styles/app.css';

class LineType extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            html: [] 
        }
    }
    
    componentDidMount() {
        this.toHTML();
    }
    
    toHTML() {
        // TODO: Add HTML conversions here
        // Please note that you need to specify the keys on each content
    }
    
    render() {
        return (
            <div className="line-item">
                { this.state.html }
            </div>
        );
    }
}

export default LineType;