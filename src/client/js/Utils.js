// Utils.js
'use strict';

export const pad = (num, size) => {
    var s = num + "";
    s = s.slice(-size);
    while(s.length < size) { s = "0" + s; }
    return s;
}

export const getDateStringWithFormat = ({ timestamp, format }) => {
    var dayStringList = ['日', '一', '二', '三', '四', '五', '六'];
    var dateObject = undefined;
    if(1000000000000 > timestamp) { dateObject = new Date(timestamp*1000); }
    else { dateObject = new Date(timestamp); }
    var matchYear = format.match(/Y/g);
    if(matchYear) { format = format.replace(/[Y]+/, pad(dateObject.getFullYear(), matchYear.length)); }
    var matchMonth = format.match(/M/g);
    if(matchMonth) { format = format.replace(/[M]+/, pad(dateObject.getMonth() + 1, matchMonth.length)); }
    var matchDate = format.match(/D/g);
    if(matchDate) { format = format.replace(/[D]+/, pad(dateObject.getDate(), matchDate.length)); }
    if(!!format.match(/d/g)) { format = format.replace(/[d]+/, dayStringList[dateObject.getDay()]); }
    var matchHours = format.match(/h/g);
    if(matchHours) { format = format.replace(/[h]+/, pad(dateObject.getHours(), matchHours.length)); }
    var matchMinutes = format.match(/m/g);
    if(matchMinutes) { format = format.replace(/[m]+/, pad(dateObject.getMinutes(), matchMinutes.length)); }
    var matchSeconds = format.match(/s/g);
    if(matchSeconds) { format = format.replace(/[s]+/, pad(dateObject.getSeconds(), matchSeconds.length)); }
    return format;
}

export const validateValue = ({ value, updateValue, updateStatus, validators }) => { return (dispatch, getState) => {
    return new Promise((resolve, reject) => {
        let resolvePromise = dispatch(updateValue({ value }))
            .then(dispatch(updateStatus({isPassed: false, status: 'info', info: '檢查中...'})));
        validators.forEach(validator => {
            resolvePromise = resolvePromise
            .then(() => validator({ value }))
            .then(({ isPassed, status, info }) => {
                if(!isPassed) {
                    throw { isPassed, status, info };
                } else {
                    return { isPassed, status, info };
                }
            });
        });
        resolvePromise
        .then(({ isPassed, status, info }) => {
            dispatch(updateStatus({ isPassed, status, info }));
            resolve({ value });
        })
        .catch(reason => {
            if(!reason.info) {
                dispatch(updateStatus({isPassed: false, status: 'danger', info: 'Error'}));
            } else {
                dispatch(updateStatus(reason));
            }
            reject(reason);
        });
    });
}; };
