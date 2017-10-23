// Team.react.js
'use strict';
import React from 'react';
import Game from './Game.react.js';
import '../css/team.less';

class Team extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { team } = this.props;
        return <div className='team'>
            <div className='card'>
                <div className='card-header'>
                    <h4 className='team-name'>
                        {team.name}
                        <span className='badge badge-secondary'>{team.gameCount}</span>
                    </h4>
                </div>
                <div className='card-body'>
                    {team.games.map((game, index) => {
                        return <Game game={game} key={index} />;
                    })}
                </div>
            </div>
        </div>;
    }
}

export default Team;
