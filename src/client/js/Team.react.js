// Team.react.js
'use strict';
import React from 'react';
import Game from './Game.react.js';
import '../css/team.less';

const isGamesInSequence = (game1, game2) => {
    const game1Date = new Date(+game1.profile.utcMillis);
    const game2Date = new Date(+game2.profile.utcMillis);
    return 1 === Math.abs(game1Date.getDate() - game2Date.getDate());
};

class Team extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { team } = this.props;
        const hasSequenceGame = team.games.reduce((current, game, index) => {
            const nextGame = team.games[index + 1];
            if(nextGame && isGamesInSequence(game, nextGame)) {
                return true;
            } else {
                return current;
            }
        }, false);
        const highlightTeamClassname = hasSequenceGame ? ' border-success' : '';
        return <div className='team'>
            <div className={`card${highlightTeamClassname}`}>
                <div className='card-header'>
                    <h4 className='team-name'>
                        {team.name}
                        <span className='team-abbr'>({team.abbr})</span>
                        <span className='badge badge-secondary'>{team.gameCount}</span>
                    </h4>
                </div>
                <div className='card-body'>
                    {team.games.map((game, index) => {
                        let hasSequenceGame = false;
                        if(team.games[index - 1] && isGamesInSequence(game, team.games[index - 1])) {
                            hasSequenceGame = true;
                        }
                        if(team.games[index + 1] && isGamesInSequence(game, team.games[index + 1])) {
                            hasSequenceGame = true;
                        }
                        return <Game game={game} key={index} hasSequenceGame={hasSequenceGame} />;
                    })}
                </div>
            </div>
        </div>;
    }
}

export default Team;
