/* eslint-disable no-console */
import webpack from 'webpack';
import WebpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevMiddleware from 'webpack-dev-middleware';
import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import userRouter from './server/routes/UserRoutes';
import documentRouter from './server/routes/DocumentRoutes';
import searchRouter from './server/routes/SearchRoutes';
import roleRouter from './server/routes/RoleRoutes';
import config from './webpack.config.dev';
import passport from './server/middlewares/Authentication';

const compiler = webpack(config);

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(WebpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(WebpackHotMiddleware(compiler));

app.use('/users', userRouter);
app.use('/documents/', documentRouter);
app.use('/search', searchRouter);
app.use('/roles', roleRouter);

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

// app.use(express.static('./client/index.html'));
app.listen(port, () => {
  console.log(`running server on port ${port}`);
});
