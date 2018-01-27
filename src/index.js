import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Storage from './containers/Storage';
import Writer from './containers/Writer';
import Viewer from './containers/Viewer';
import registerServiceWorker from './services/registerServiceWorker';

ReactDOM.render(
    <Storage> 
        <Writer />
        <Viewer />
    </Storage>, 
    document.getElementById('root'));
registerServiceWorker();
