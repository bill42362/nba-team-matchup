// Teams.js
'use strict';

const now = new Date();
const year = now.getFullYear();
const month = now.getMonth();
const date = now.getDate();
const dayOffset = now.getDay() - 2;
const thisTuesday = new Date(year, month, date - dayOffset);
const defaultState = thisTuesday.getTime();

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
