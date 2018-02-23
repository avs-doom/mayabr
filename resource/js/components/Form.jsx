'use strict';

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Autosuggest from 'react-autosuggest';

import { addCity } from '../_core/Store';
import Filter from './Filter';


@connect(
    state => ({
        cities: state.cities
    }),
    dispatch => ({
        onAddCity: id => dispatch(addCity(id))
    })
)

export default class Form extends Component {
    
    static get propTypes() {
        return {
            cities: PropTypes.array.isRequired
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
            cities: props.cities,
            city: {
                name: ''
            }
        };
    }
    
    _setCity(city = {name: ''}) {
        
        this.setState({city});
    }
    
    _getSuggestions(value) {
        
        const { cities } = this.state;
        const valueTrim = value && value.trim();
        const escapedValue = valueTrim.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        
        if (escapedValue === '') {
            return [];
        }
        
        const regex = new RegExp(`^${escapedValue}`, 'i');
        
        return cities.filter(city => regex.test(city.name));
    }
    
    _onChange(event, { newValue, method }) {
        
        switch(method) {
            case 'click':
            case 'down':
            case 'enter':
                this._setCity(newValue);
                break;
            default:
                this._setCity({ name: newValue })
                break;
        }
    }
    
    _handlerClickAddCityButton() {
        
        const { city } = this.state;
        const { onAddCity } = this.props;
        
        if (onAddCity) {
            onAddCity(city.id);
        }
        
        this._setCity();
    }
    
    render() {
        
        const { city: { name, id } } = this.state;
        
        const suggestions = this._getSuggestions(name);
        
        return (
            <section className="dashboard">
                <div className="dashboard__form">
                    <form>
                    <Autosuggest
                        suggestions={suggestions}
                        onSuggestionsFetchRequested={() => {}}
                        onSuggestionsClearRequested={() => {}}
                        renderSuggestion={item => { return <span>{item.name}</span>; }}
                        getSuggestionValue={item => { return item; }}
                        inputProps={{
                            placeholder: "Выберите город из списка",
                            value: name,
                            onChange: this._onChange.bind(this)}
                        }
                    />
                    <button
                        type="submit"
                        className="button" 
                        onClick={this._handlerClickAddCityButton.bind(this)}
                        disabled={!id}
                    >+</button>
                    </form>
                </div>
                <div className="dashboard__filter">
                    <Filter />
                </div>
            </section>
        );
    }
}