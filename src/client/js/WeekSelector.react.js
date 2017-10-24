// WeekSelector.react.js
'use strict';
import React from 'react';
import { getDateStringWithFormat } from './Utils.js';
import '../css/week-selector.less';

const MSEC_IN_ONE_WEEK = 1000*60*60*24*7;

class WeekSelector extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { timestamp, updateTimestamp } = this.props;
        return <div className='week-selector'>
            <div className='card'>
                <div className='card-body'>
                    <div className='week-selector-wrapper'>
                        <div className='change-week-button'>
                            <button
                                className='btn btn-primary change-week-button' type='button'
                                onClick={() => updateTimestamp({timestamp: timestamp - MSEC_IN_ONE_WEEK})}
                            >上週</button>
                        </div>
                        <div className='current-week'>
                            <span className='start-date'>
                                {getDateStringWithFormat({timestamp, format: 'YYYY-MM-DD (d)'})}
                            </span>
                            <span className='date-dash'>-</span>
                            <span className='end-date'>
                                {getDateStringWithFormat({
                                    timestamp: timestamp + MSEC_IN_ONE_WEEK - 1,
                                    format: 'YYYY-MM-DD (d)'
                                })}
                            </span>
                        </div>
                        <div className='change-week-button'>
                            <button
                                className='btn btn-primary change-week-button' type='button'
                                onClick={() => updateTimestamp({timestamp: timestamp + MSEC_IN_ONE_WEEK})}
                            >下週</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default WeekSelector;
