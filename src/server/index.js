// index.js
'use strict';
import 'isomorphic-fetch';
import Express from 'express';

const isProd = process.env.NODE_ENV === 'production';
const WEB_PORT = process.env.PORT || 3000;
const expressStaticRoutes = [
    {path: '/img/', serverPath: '/../client/img'},
    {path: '/css/', serverPath: '/../client/css'},
    {path: '/js/', serverPath: '/../client/js'},
];
const renderApp = `
    <!doctype html>
    <html>
        <head>
            <title>pb+ login</title>
        </head>
        <body>
            <div id="app-root"></div>
            <script type='text/javascript' src="${isProd ? `/js/bundle.js` : `http://localhost:7000/js/bundle.js`}" ></script>
        </body>
    </html>
`;
const app = Express();

app.get('/', (req, res) => { res.send(renderApp); })
app.get('/schedule', (req, res) => {
    fetch('https://tw.global.nba.com/stats2/season/schedule.json?countryCode=TW&days=7&locale=zh_TW&tz=%2B8', {method: 'get'})
    .then(response => {
        if(response.status >= 400) { throw new Error('Bad response from server'); }
        return response.json();
    })
    .then(response => {
        const { dates } = response.payload;
        res.send(dates);
    })
    .catch(error => { res.send(error); });
})
app.get('/:action', (req, res) => { res.send(renderApp); })
expressStaticRoutes.forEach(function(route) {
    app.use(route.path, Express.static(__dirname + route.serverPath));
});
app.listen(WEB_PORT);
