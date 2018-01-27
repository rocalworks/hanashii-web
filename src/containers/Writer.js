import React, { Component } from 'react';
import { ButtonGroup, Button, FormGroup, FormControl} from 'react-bootstrap';

import './../styles/app.css';
import 'bootstrap/dist/css/bootstrap.css'

class Writer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            noContent: true,
            fromLoadedFile: false
        }
    }
    
    componentWillReceiveProps(nextProps) {
        this.setState(() => {
            return {
                noContent: false
            };
        });
    }
    
    getInput(e) {
        // No preview on empty content
        if (e.target.value !== "") {
            this.setState({ noContent: false });
        } else {
            this.setState({ noContent: true });
        }
        
        this.props.setCurrentText(e.target.value);
    }
    
    storeInput(e) {
        // Automatic preview when file is loaded
        if (this.props.isPreview) {
            this.props.togglePreview();
            return;
        }
        
        // Split string line into objects 
        var splitInput = this.props.rawData.split("\n\n");      // Split raw input into chunks of lines
        var updatedConvo = [];                                      // Converted object goes here
        
        for(var i = 0; i < splitInput.length; i++) {
            updatedConvo.push(this.props.toConvoItem(splitInput[i]));
        }
        
        // Pass to parent
        this.props.fetchInput(updatedConvo);
        
        // Open Preview modal
        this.props.togglePreview(true);
    }
    
    stopInput(e) {
        e.preventDefault();
        this.changeNotif("danger", "Error!", "Multiple linebreaks spotted. Type something else first.");
    }
    
    changeNotif(type, header, message) {
         this.setState(() => {
            return {
                systemPrompt: {
                    type: type,
                    header: header,
                    message: message
                }
            };
        });
    }
    
    render() {
        return (
            <div className="writer-container">
                <FormGroup controlId="input-content" onChange={this.getInput.bind(this)}>
                    <FormControl componentClass="textarea" placeholder="textarea" />
                </FormGroup>
                <ButtonGroup justified>
                    <label className="btn btn-lg btn-warning"> Browse <input type="file" id="file-input" onChange={this.props.loadFile} hidden /> </label>
                    <Button href="#" bsStyle="primary" bsSize="large" onClick={this.storeInput.bind(this)} disabled={this.state.noContent}>Preview</Button>
                    <Button href="#" bsStyle="success" bsSize="large" onClick={this.props.saveFile}  disabled={this.state.noContent}>Save Draft</Button>
                </ButtonGroup>
            </div>
        );
    }
}

export default Writer;
