const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyparser = require('body-parser');
const path = require('path');
const nocache = require('nocache');

const userRoutes = require('./routes/users');
const postsRoutes = require('./routes/posts');
const commentsRoutes = require('./routes/comments');
const reactionsRoutes = require('./routes/reactions');

const dbConnection = require('./db_connect');

const app = express();

/**
 * Setting up the CORS (Cross-origin-resource-sharing)
 */
 app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

/**
 * Definition of the cache-control and Pragma headers with the nocache package
 * This one disables client-side caching
 */
 app.use(nocache());

/**
 * bodyParser will parse the body of the json file
 */
app.use(bodyparser.json());

/** 
 * Cors package
*/
app.use(cors());

/**
 * Securing http headers with the Helmet package :
 * x-powered-by
 * Xss
 * Anti-click Jacking (frameguard)
 * X-content-Type (noSniff)
 * CSP 
 * Hsts(Strict-Transport-Security)
 */
 app.use(helmet.hidePoweredBy(),
 helmet.xssFilter(),
 helmet.frameguard({ action: 'deny' }),
 helmet.noSniff(),
 helmet.contentSecurityPolicy(),
 helmet.hsts(),
 );
 

 app.use('/images', express.static(path.join(__dirname, 'images')));
 app.use('/api/auth', userRoutes);
 app.use('/api/posts', postsRoutes);
 app.use('/api/comments', commentsRoutes);
 app.use('/api/reactions', reactionsRoutes);

 
module.exports = app;