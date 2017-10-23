// App.react.js
'use strict';
import { connect } from 'react-redux';
import React from 'react';
import WeekSelector from './WeekSelector.react.js';
import Team from './Team.react.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.less';

const ConnectedWeekSelector = connect(
    (state, ownProps) => {
        return {
            timestamp: state.week,
        };
    },
    (dispatch, ownProps) => { return {
    }; }
)(WeekSelector);

class App extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { teams } = this.props;
        return <div className='app'>
            <ConnectedWeekSelector />
            <div className='row'>
                {teams.map((team, index) => {
                    return <Team team={team} key={index} />;
                })}
            </div>
        </div>;
    }
}

export default App;
