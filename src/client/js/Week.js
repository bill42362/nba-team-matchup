// Teams.js
'use strict';

const defaultState = new Date().getTime();

const Reducer = (state = defaultState, action) => {
    switch(action.type) {
        case 'UPDATE_TIMESTAMP':
            return action.payload.timestamp;
        default:
            return state;
    }
}

const updateTimestamp = ({ timestamp }) => {
    return {type: 'UPDATE_TIMESTAMP', payload: { timestamp }};
};

const Actions = { updateTimestamp };

export default { Reducer, Actions };
