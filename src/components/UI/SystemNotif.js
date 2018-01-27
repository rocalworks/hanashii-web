import React, { Component } from 'react'; 
import { Alert } from 'react-bootstrap';

class SystemNotif extends Component  {
    constructor(...args) {
		super(...args);

		this.handleAlertShow = this.handleAlertShow.bind(this);
		this.handleAlertDismiss = this.handleAlertDismiss.bind(this);

		this.state = {
			alertVisible: true
		};
	}
    
    handleAlertDismiss() {
		this.setState({ alertVisible: false });
	}

	handleAlertShow() {
		this.setState({ alertVisible: true });
	}
    
    render() {
        if (this.state.alertVisible) {
			return (
				<Alert bsStyle={this.props.type} onDismiss={this.handleAlertDismiss}>
					<div className="notif-container">
                        <strong> {this.props.header} </strong> {this.props.message} <a href="#" onClick={this.handleAlertDismiss}> [Hide message] </a>
                    </div>
				</Alert>
			);
		}
        
        return(
             <a href="#" className="btn-shownotif" onClick={this.handleAlertShow}> [Show message] </a>
        );
    }
}

export default SystemNotif;