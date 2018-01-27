import React, { Component } from 'react';
import { Modal, Button, } from 'react-bootstrap';
import Narration from './../components/UI/Narration';
import Conversation from './../components/UI/Conversation';
import SystemNotif from './../components/UI/SystemNotif';
import showNotif from './../store/systemNotifList';

class Viewer extends Component {
	constructor(props) {
		super(props);

		this.state = { 
            showModal: false,   
            noContent: true,
            systemPrompt: showNotif("viewerWelcome")
        };
	}
    
    componentWillReceiveProps(nextProps) {
        // TODO: Find a way na dili mag-open ang Preview once nag-upload ug file
        if (nextProps.isPreview) {
            this.setState({
                showModal: true
            });
        } 
        
        if (nextProps.conversation !== null) {
            this.setState({noContent: false});
        } 
    }
    
    handleClose() {
        this.setState({showModal: false});
        this.props.togglePreview(false);
    }
    
    toHTML() {
        if (!this.state.noContent) {
            // TODO: Convert objects to mark-up (separate components as much as possible)
            var html = [];
            var convo = this.props.conversation;
            
            for(var i = 0 ;i < convo.length; i++) {
                if (convo[i].type === "conversation") {
                    for(var j = 0; j < convo[i].content.length; j++) {
                        var isLast = " ";
                        if (j === convo[i].content.length - 1) { 
                            isLast = "last"; 
                        }
                        html.push(<Conversation key={i + "-" + j} avatar={convo[i].avatar} content={convo[i].content[j]} isLast={isLast}/>);
                    }
                } else {
                    html.push(<Narration key={i} content={convo[i].content} isLast="last"/>);
                }
            }
            
            return html;
        }
    }
    
	render() {
		return (
			<div>
				<Modal show={this.state.showModal} onHide={this.handleClose.bind(this)}>
					<Modal.Header closeButton>
						<Modal.Title>Preview</Modal.Title>
					</Modal.Header>
					<Modal.Body id="html-content">
                        <div id="system-notif-viewer"> 
                            <SystemNotif type={this.state.systemPrompt.type} header={this.state.systemPrompt.header} message={this.state.systemPrompt.message} />
                        </div>
                        <hr />
						{this.toHTML()}
					</Modal.Body>
					<Modal.Footer>
                        <Button bsStyle="primary" onClick={this.props.saveFile}>Save Draft</Button>
                        <Button bsStyle="success" onClick={this.props.exportFile}>Export HTML</Button>
						<Button onClick={this.handleClose.bind(this)}>Close</Button>
					</Modal.Footer>
				</Modal>
			</div>
		);
	}
}

export default Viewer;