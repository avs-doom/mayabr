'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Tooltip from 'rc-tooltip';
import Slider,{ Handle } from 'rc-slider';

import { changeFilter } from '../_core/Store';


@connect(
    state => ({
        minTemp: state.minTemp
    }),
    dispatch => ({
        onChange: value => dispatch(changeFilter(value))
    })
)

export default class Filter extends Component {
    
    static get propTypes() {
        return {
            minTemp: PropTypes.number.isRequired
        }
    }
    
    constructor(props) {
        super(props);
    }
    
    _handlerChange(params) {
        
        const { onChange } = this.props;
        const { value, index, ...restProps } = params;
        
        
        window.setTimeout(() => {
            if (onChange) {
                onChange(value);
            }
        }, 300);
        
        return (
            <Tooltip
              prefixCls="rc-slider-tooltip"
              overlay={`+ ${value} ℃`}
              visible={true}
              placement="bottom"
              key={index}
            >
              <Handle value={value} {...restProps} dragging="false" />
            </Tooltip>
          );
    }
    
    render() {
        
        return (
            <section className="filter">
                Где сейчас теплее, чем
                <Slider min={1} max={10} defaultValue={1} handle={this._handlerChange.bind(this)} />
            </section>
        );
    }
}