// index.js
'use strict';
import 'isomorphic-fetch';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import Teams from './Teams.js';
import App from './App.react.js';
import 'normalize.css';
import '../css/index.less';

const reducer = combineReducers({
    teams: Teams.Reducer,
});
const store = createStore(reducer, applyMiddleware(ReduxThunk));

fetch('/schedule', {method: 'get'})
.then(response => {
    if(response.status >= 400) { throw new Error('Bad response from server'); }
    return response.json();
})
.then(response => {
    const dates = response;
    dates.forEach(date => {
        date.games.forEach(game => {
            const { homeTeam, awayTeam } = game;
            store.dispatch(Teams.Actions.pushTeam({team: Object.assign(
                {}, homeTeam.profile, {games: [game]}
            )}));
            store.dispatch(Teams.Actions.pushTeam({team: Object.assign(
                {}, awayTeam.profile, {games: [game]}
            )}));
        });
    });
})
.catch(error => { res.send(error); });

const ConnectedApp = connect(
    (state, ownProps) => {
        return {
            teams: state.teams.sort((a, b) => { return a.gameCount > b.gameCount ? -1 : 1}),
        };
    },
    (dispatch, ownProps) => { return {
    }; }
)(App);

ReactDOM.render(
    <Provider store={store} >
        <ConnectedApp />
    </Provider>,
    document.getElementById('app-root')
);
