'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';

import Form from '../components/Form';
import Dashboard from '../components/Dashboard';


export default class Application extends Component {
    
    constructor(props) {
        super(props);
    }
    
    render() {
        
        return (
            <div className="wrapper">
                <Form />
                <Dashboard />
            </div>
        );
    }
}