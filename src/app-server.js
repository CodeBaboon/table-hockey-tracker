import koa from 'koa';
import route from 'koa-route';
import mount from 'koa-mount';
import serve from 'koa-static'
import views from 'koa-views';
import Standings from './api/standings';

const app = koa();

app.use(mount('/static', serve(__dirname + '/static')));

app.use(views(__dirname + '/views', {
  map: {
    html: 'mustache'
  }
}));

app.use(route.get('/', home));
app.use(route.get('/api/standings/', Standings.list))

function *home() {
	yield this.render('home');
}

const server = app.listen(process.env.PORT || 3000, () => {
	const {address, port} = server.address();
	console.log(`Example app listening at http://${address}:${port}`);
});
