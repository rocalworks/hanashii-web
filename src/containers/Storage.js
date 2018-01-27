import React, { Component } from 'react';
import Writer from './Writer';
import Viewer from './Viewer';

import getAvatar from './../store/avatarList';

class Storage extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            rawData: "",
            conversation: [],
            isCharList: false,
            isPreview: false,
            isLoadedFile: false
        }
    }
    
    updateRawData(newText) {
        this.setState({
            rawData: newText
        });
    }
    
    updateConversation(convo) {
        this.setState({
            conversation: convo
        })
    }
    
    togglePreview(isPreview) {
        this.setState({
            isPreview: isPreview
        });
    }
       
    loadFromLocal(e) {
        var file = e.target.files[0];
        var reader = new FileReader();
        
        // Load file from computer
        reader.onload = function(event) {
            document.getElementById("input-content").value = event.target.result;
            this.setState(() => {
                return {
                    isLoadedFile: true,
                    rawData: document.getElementById("input-content").value
                };
            });
        }.bind(this);
        
        reader.readAsText(file);
        
    }
    
    storeToLocal() {
        this.saveFile(this.state.rawData, 'doc/docx', "hanashii-savedata.doc");
    }
    
    exportToHTML(title) {
        var head = (
            "<head>" + 
                "<title>Hanashii~ Output</title>" + 
                "<!-- Latest compiled and minified CSS -->" +
                "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/latest/css/bootstrap.min.css'>" +
                "<link rel='stylesheet' href='app.css'>" +
            "</head>"
        );
        var body = "<body>" + document.getElementById("html-content").innerHTML + "</body>";
        
        this.saveFile("<html>" + head + body + "</html>", "html", "hanashii-" + title + ".html");
    }
    
    saveFile(data, type, filename) {
        // TODO: Save JSON file into text
        var blob = new Blob([data], {type: type});
        
        if(window.navigator.msSaveOrOpenBlob) {
            window.navigator.msSaveBlob(blob, filename);
        }
        else{
            var elem = window.document.createElement('a');
            elem.href = window.URL.createObjectURL(blob);
            elem.download = filename;        
            document.body.appendChild(elem);
            elem.click();        
            document.body.removeChild(elem);
        }
    }
    
    toConvoItem(line) {
        var convoItem = []; 
        
        // Check line type
        var tempItem = [];      // Temporary holder for split items
        
        // For conversation types
        if (line[0] === "@") {
            tempItem = line.split("\n")
            
            // Check avatar if it's in the avatar database 
            // Algo: isOnAvatarList ? return it : warn user and use default settings
            var tempAvatar = getAvatar(tempItem[0].substring(1));
            
            // Check content for empty lines
            var tempContent = [];
            for (var i = 1; i < tempItem.length; i++) {
                // If it is a single whitespace, skip it
                if (this.checkWhitespace(tempItem[i])) {
                    continue;
                }
                // Else, store content
                tempContent.push(tempItem[i]);
            }
            
            // Set everything here
            convoItem = {
                type: "conversation", 
                avatar: tempAvatar, 
                content: tempContent
            }
        } 
        
        // For command types
        else if (line[0] === "$") {
            tempItem = line.substring(1, line.length - 1).split(":");
            convoItem = {
                type: "command",
                command: tempItem[0],
                parameters: tempItem[1]
            }
        } 
        
        // For narration types
        else {
            convoItem = {
                type: "narration",
                content: line
            }
        }
        
        // Add others to content
        return convoItem;
    }
    
    checkWhitespace(line) {
        return (/^\s*$/.test(line));
    }
    
    render() {
        return(
            <div>
                <Writer 
                    rawData={this.state.rawData}
                    setCurrentText={this.updateRawData.bind(this)}
                    fetchInput={this.updateConversation.bind(this)} 
                    toConvoItem={this.toConvoItem.bind(this)} 
                    togglePreview={this.togglePreview.bind(this)} 
                    loadFile={this.loadFromLocal.bind(this)}
                    saveFile={this.storeToLocal.bind(this)}
                />
                <Viewer
                    isPreview={this.state.isPreview} 
                    conversation={this.state.conversation} 
                    togglePreview={this.togglePreview.bind(this)} 
                    saveFile={this.storeToLocal.bind(this)}
                    exportFile={this.exportToHTML.bind(this)}
                />
            </div>
        );
    }
}
    

export default Storage;