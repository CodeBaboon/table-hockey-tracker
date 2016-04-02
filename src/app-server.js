import koa from 'koa';
import bodyparser from 'koa-bodyparser';
import route from 'koa-route';
import mount from 'koa-mount';
import serve from 'koa-static'
import views from 'koa-views';
import pg from 'koa-pg';
import Standings from './api/standings';
import Matches from './api/matches';
import Awards from './api/awards';

const app = koa();

app.use(bodyparser());
app.use(mount('/static', serve(__dirname + '/static')));

app.use(views(__dirname + '/views', {
  map: {
    html: 'mustache'
  }
}));

app.use(pg({
    name: 'db',
    conStr: process.env.DATABASE_URL
}));

app.use(route.get('/api/standings/', Standings.list));
app.use(route.get('/api/standings/:player', Standings.perOpponent));
app.use(route.get('/api/matches/', Matches.list));
app.use(route.post('/api/matches/', Matches.add));
app.use(route.get('/api/awards/', Awards.list));
app.use(route.get('*', home));

function *home() {
	yield this.render('home');
}

const server = app.listen(process.env.PORT || 3000, () => {
	const {address, port} = server.address();
	console.log(`Example app listening at http://${address}:${port}`);
});
