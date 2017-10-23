// App.react.js
'use strict';
import { connect } from 'react-redux';
import React from 'react';
import Team from './Team.react.js';
import 'bootstrap/dist/css/bootstrap.css';
import '../css/app.less';

class App extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { teams } = this.props;
        return <div className='app'>
            <div className='row'>
                {teams.map((team, index) => {
                    return <Team team={team} key={index} />;
                })}
            </div>
        </div>;
    }
}

export default App;
