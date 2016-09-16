import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import route from 'koa-route';
import mount from 'koa-mount';
import serve from 'koa-static';
import views from 'koa-views';
import pg from 'koa-pg';
import Healthcheck from './api/healthcheck';
import Standings from './api/standings';
import Matches from './api/matches';
import Awards from './api/awards';
import Players from './api/players';

const app = koa();

app.use(bodyparser());
app.use(mount('/static', serve(__dirname + '/static')));

app.use(views(__dirname + '/views', {
  map: {
    html: 'mustache'
  }
}));

console.log('db url is ', process.env.DATABASE_URL);

app.use(pg({
    name: 'db',
    conStr: process.env.DATABASE_URL
}));

app.use(route.get('/api/healthcheck/', Healthcheck.list));
app.use(route.get('/api/standings/', Standings.list));
app.use(route.get('/api/matches/:limit?', Matches.list));
app.use(route.post('/api/matches/', Matches.add));
app.use(route.get('/api/awards/', Awards.list));
app.use(route.get('/api/players/', Players.list));
app.use(route.get('/api/players/:player/standings/opponent', Standings.perOpponent));
app.use(route.get('/api/players/:player/matches/:limit?', Matches.byPlayer));
app.use(route.get('*', home));

function *home() {
	yield this.render('home');
}

const server = app.listen(process.env.PORT || 3000, () => {
	const {address, port} = server.address();
	console.log(`Example app listening at http://${address}:${port}`);
});
