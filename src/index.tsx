import React from 'react';
import 'capacitor-camera-preview';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

// Call the element loader after the app has been rendered the first time
defineCustomElements(window);