'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { removeCity } from '../_core/Store';


@connect(
    state => ({
        dashboard: state.dashboard,
        minTemp: state.minTemp
    }),
    dispatch => ({
        onRemoveCity: cityId => dispatch(removeCity(cityId))
    })
)

export default class Dashboard extends Component {
    
    static get propTypes() {
        return {
            dashboard: PropTypes.array.isRequired,
            minTemp: PropTypes.number.isRequired
        }
    }
    
    constructor(props) {
        super(props);
        
        this.state = this._setState(props);
    }
    
    componentWillReceiveProps(nextProps) {
        
        this.setState(this._setState(nextProps));
    }
    
    _setState(props) {
        
        return {
            dashboard: props.dashboard
        };
    }
    
    _getIcon(type) {
        
        switch(type) {
            
            case 1:
                return 'https://yastatic.net/weather/i/icons/funky/dark/skc_d.svg';
            case 2:
                return 'https://yastatic.net/weather/i/icons/funky/dark/ovc_-ra.svg';
            default:
                return '';
        }
        
    }
    
    _handlerClickRemove(cityId) {
        
        const { onRemoveCity } = this.props;
        
        if (onRemoveCity) {
            onRemoveCity(cityId);
        }
    }
    
    //Можно былобы создать отдельный компонент карточки,
    //но нет смысла т.к. используется только здесь
    _renderBlockTemplate (item, index) {
        
        const { name, temp, wind, pressure, id, type } = item;
        
        return (
            <div className="dashboard__block" key={index}>
                <div><b>{name}</b></div>
                <div style={{margin: '10px 0', fontSize: '24px'}}>
                    <img src={this._getIcon(type)} className="dashboard__icon" /> {temp} &#8451;
                </div>
                <div>Ветер: {wind} м/с</div>
                <div>Давление: {pressure} мм</div>
                <div className="dashboard__block-remove" onClick={this._handlerClickRemove.bind(this, id)}>x</div> 
            </div>
        );
    }
    
    
    render() {
        
        const { dashboard, minTemp } = this.props;
        
        const blocks = dashboard.filter(item => {
            return item.temp > minTemp;
        });
        
        return (
            <article className="dashboard">
                {blocks.map(this._renderBlockTemplate.bind(this))}
                {blocks.length === 0
                    ? <span style={{color: '#666'}}>Пусто :(</span>
                    :null}
             </article>
        );
    }
}