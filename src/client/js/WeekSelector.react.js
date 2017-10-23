// WeekSelector.react.js
'use strict';
import React from 'react';
import { getDateStringWithFormat } from './Utils.js';
import '../css/week-selector.less';

class WeekSelector extends React.Component {
    constructor(props) { super(props); }
    render() {
        const { timestamp } = this.props;
        return <div className='week-selector'>
            <div className='card'>
                <div className='card-body'>
                    <div className='current-week'>
                        <div className='start-date'> </div>
                        -
                        <div className='end-date'> </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}

export default WeekSelector;
