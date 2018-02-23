'use strict';

const initialState = {
    cities: [{
        id: 1,
        name: 'Москва',
        temp: 7,
        type: 1,
        wind: 5,
        pressure: 752
    }, {
        id: 2,
        name: 'Санкт-Петербург',
        temp: 2,
        type: 2,
        wind: 8,
        pressure: 730
    }, {
        id: 3,
        name: 'Екатеринбург',
        temp: 8,
        type: 2,
        wind: 12,
        pressure: 740
    }],
    dashboard: [],
    minTemp: 0
};

const ADD_CITY = 'ADD_CITY';
const REMOVE_CITY = 'REMOVE_CITY';
const CHANGE_FILTER = 'CHANGE_FILTER';

export function forecast(state = initialState, action) {
    
    let dashboard = [];
    const { type, cityId, minTemp } = action;
    const { cities } = state;
    
    if (type === ADD_CITY) {
        
        dashboard = state.dashboard.slice();
        
        const city = cities.find(city => {
            return city.id === cityId && !dashboard.find(item => {
                return item.id === cityId;
            });
        });
        
        if (city) {
            dashboard.push(city);
        }
        
        return {...state, dashboard};
    } else if (type === REMOVE_CITY) {
        
        dashboard = state.dashboard.filter(item => {
                return item.id !== cityId;
            });
                           
        return {...state, dashboard};
    } else if (type === CHANGE_FILTER) {
        return {...state, minTemp};
    } else {
        return state;
    }
}

export function addCity(cityId) {
    return {type: ADD_CITY, cityId};
}

export function removeCity(cityId) {
    return {type: REMOVE_CITY, cityId};
}

export function changeFilter(minTemp) {
    return {type: CHANGE_FILTER, minTemp};
}