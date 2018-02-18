'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Dashboard from '../components/Dashboard';
import Forecast from '../components/Forecast';


export default class Application extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <section className="wrapper">
                <Dashboard />
                <Forecast />
            </section>
        );
    }
}