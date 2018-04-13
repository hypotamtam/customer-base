/* eslint-disable react/jsx-filename-extension */
import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import configureStore from './main/store'
import registerServiceWorker from './main/registerServiceWorker'
import './index.css'
import App from './main/components/App'


registerServiceWorker()

const store = configureStore()

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'))

