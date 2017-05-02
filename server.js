const express = require('express');
const userRouter = require('./server/routes/userRoutes.js');
const documentRouter = require('./server/routes/documentRoutes.js');
const searchRouter = require('./server/routes/searchRoutes.js');
const roleRouter = require('./server/routes/roleRoutes.js');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const passport = require('./server/middlewares/authentication');

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`running server on port ${port}`);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(passport.initialize());
app.use(express.static('client/views'));
app.use('/users', userRouter);
app.use('/documents/', documentRouter);
app.use('/search', searchRouter);
app.use('/roles', roleRouter);

app.get('/', (req, res) => {
  res.send('Hello world!');
});
