const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require ('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');
const keys = require('./config/keys');
require('./models/User');
require('./models/Survey');
require('./services/passport');


mongoose.connect(keys.mongoURI);

const app = express();

app.use(bodyParser.json());

app.use (
  cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys:[keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);
require('./routes/surveyRoutes')(app);
//console.developers.google.com




if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    });
}

/******  Get Ip Address *********/
const requestIp = require('request-ip');

// inside middleware handler
const ipMiddleware = function(req, res, next) {
    const clientIp = requestIp.getClientIp(req);
    next();
};


app.use(requestIp.mw());

app.use(function(req, res) {
    const ip = req.clientIp;
    console.log("ip: "+ ip);
    res.end(ip);
});

/******** Graphql *******/
const graphqlHttp = require('express-graphql');
const graphqlSchema= require('./graphql/schema');
const graphqlResolver= require('./graphql/resolvers');
app.use('/graphql',graphqlHttp({
    schema : graphqlSchema,
    rootValue : graphqlResolver,
    graphiql: true,
    formatError(err) {
        if(!err.originalError){
            return err;
        }
        const data= err.originalError.data;
        const message= err.message || 'An error occurred';
        const code = err.originalError.code || 500;
        return {message :message, status : code, data: data};

    }
}));
/** ********************/

app.use(express.static('client/build'));
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
});


const PORT = process.env.PORT || 5000;
app.listen(PORT);


/** npx ngrok http 5000 **/