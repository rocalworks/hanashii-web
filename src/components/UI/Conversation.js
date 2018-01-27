import React from 'react';
import { Media } from 'react-bootstrap';
import LineType from './LineType';

class Conversation extends LineType {
    
    toHTML() {
        var left, right = ""; 
        var raw = this.props.content;
        var image = <img src={this.props.avatar.imageURL} className="avatar-image" alt={this.props.avatar.variableName}/>;
        var isRight = "";
        
        if (this.props.avatar.isNarrator) {
            right = image;
            isRight = "-right";
        } else {
            left = image;
        }
        
        var html = (
            <Media bsClass= {"conversation-item " + this.props.isLast}>
                <Media.Left>
                    {left}
                </Media.Left>
                <Media.Body>
                    <Media.Heading componentClass="h6" bsClass={"avatar-name" + isRight}>{this.props.avatar.displayName}</Media.Heading>
                    { /* TODO: Modify well into something better */}
                    <p className={"avatar-line" + isRight} style={{backgroundColor: this.props.avatar.bubbleColor}}> {raw} </p>
                </Media.Body>
                <Media.Right>
                    {right}
                </Media.Right>
            </Media>
        );
        
        this.setState({ html: html });
    }
    
}

export default Conversation;