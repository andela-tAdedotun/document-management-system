/* eslint-disable no-console */
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import userRouter from './server/routes/UserRoutes';
import documentRouter from './server/routes/DocumentRoutes';
import searchRouter from './server/routes/SearchRoutes';
import roleRouter from './server/routes/RoleRoutes';
import passport from './server/middlewares/Authentication';
import db from './server/models';
import removeTrailingSlash from './shared/RemoveTrailingSlash';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
removeTrailingSlash(app);
app.use('/api/users', userRouter);
app.use('/api/documents/', documentRouter);
app.use('/api/search', searchRouter);
app.use('/api/roles', roleRouter);

app.use(compression());
app.use(express.static('dist'));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/dist/index.html`);
});

db.sequelize.sync().done(() => {
  app.listen(port, () => {
    console.log(`running server on port ${port}`);
  });
});

export default app;
