// Game.react.js
'use strict';
import React from 'react';
import { getDateStringWithFormat } from './Utils.js';
import '../css/game.less';

class Game extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { game, hasSequenceGame } = this.props;
        const highlightGameClassname = hasSequenceGame ? ' text-white bg-success' : '';
        return <div className='game'>
            <div className={`card${highlightGameClassname}`}>
                <div className='card-body'>
                    <div className='matchup-teams'>
                        <span className='away-team'>{game.homeTeam.profile.name}</span>
                        <span className='vs'>vs</span>
                        <span className='home-team'>{game.awayTeam.profile.name}</span>
                    </div>
                    <div className='matchup-time'>
                        {getDateStringWithFormat({timestamp: +game.profile.utcMillis, format: 'MM/DD (d) hh:mm'})}
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default Game;
