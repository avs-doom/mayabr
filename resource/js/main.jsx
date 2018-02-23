'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import Application from './_core/Application';
import { forecast } from './_core/Store';


export class Main  {
    
    constructor() {
        
        const store = createStore(forecast);
        const container = document.getElementById('application');
        
        ReactDOM.render(
            <Provider store={store}>
                <Application />
            </Provider>
        , container);
    }
}

export default new Main();