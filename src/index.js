import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from 'react-redux'
import configureStore from './main/store'
import registerServiceWorker from './main/registerServiceWorker';
import App from "./main/components/App";


registerServiceWorker();

const store = configureStore()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

