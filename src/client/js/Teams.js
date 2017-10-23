// Teams.js
'use strict';

const defaultState = [];

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'PUSH_TEAM':
            const { team } = action.payload;
            const isTeamExist = !!state.filter(stateTeam => team.id === stateTeam.id)[0];
            if(isTeamExist) {
                return state.map(stateTeam => {
                    if(team.id === stateTeam.id) {
                        return Object.assign(
                            {},
                            stateTeam,
                            {
                                gameCount: stateTeam.gameCount + 1,
                                games: [...stateTeam.games, ...team.games],
                            }
                        );
                    } else {
                        return stateTeam;
                    }
                });
            } else {
                return [ ...state, Object.assign({}, team, {gameCount: 1})];
            }
        default:
            return state;
    }
}

const pushTeam = ({ team }) => { return {type: 'PUSH_TEAM', payload: { team }}; };

const Actions = { pushTeam };

export default { Reducer, Actions };
