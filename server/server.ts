import 'angular2-universal/polyfills';

import * as path from 'path';
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Angular 2 Universal
import {
  provide,
  enableProdMode,
  expressEngine,
  REQUEST_URL,
  ORIGIN_URL,
  BASE_URL,
  NODE_ROUTER_PROVIDERS,
  NODE_HTTP_PROVIDERS,
  ExpressEngineConfig
} from 'angular2-universal';

// Application
//import {App} from '../client/app/app.component';
import {App} from '../client/app/app';

const app = express();
const ROOT = path.join(path.resolve(__dirname, '..'));
const CLIENT = path.resolve(ROOT, 'client');
//console.log('CLIENT', CLIENT);
enableProdMode();

// Express View
app.engine('.html', expressEngine);
//app.set('views', __dirname);
app.set('views', CLIENT);
app.set('view engine', 'html');

app.use(bodyParser.json());
// Serve static files
app.use(express.static(ROOT, {index: false}));

// Our API for demos only
app.get('/data.json', (req, res) => {
  res.json({
    data: 'This fake data came from the server.'
  });
});

// Routes with html5pushstate
app.use('/', ngApp);
app.use('/about', ngApp);
app.use('/home', ngApp);

// Server
app.listen(3060, () => {
  console.log('Listening on: http://localhost:3060');
});

function ngApp(req, res) {
  let baseUrl = '/';
  let url = req.originalUrl || '/';

  let config: ExpressEngineConfig = {
    directives: [ App ],
    platformProviders: [
      provide(ORIGIN_URL, {useValue: 'http://localhost:3060'}),
      provide(BASE_URL, {useValue: baseUrl}),
    ],
    providers: [
      provide(REQUEST_URL, {useValue: url}),
      NODE_ROUTER_PROVIDERS,
      NODE_HTTP_PROVIDERS,
    ],
    async: true,
    preboot: { appRoot: 'app' } // your top level app component selector
  };

  res.render(path.resolve(CLIENT, 'index'), config);
}

// function indexFile(req, res) {
//   res.sendFile('/index.html', {root: __dirname});
// }