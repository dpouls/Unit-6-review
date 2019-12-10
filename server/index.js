require('dotenv').config();
// Put this on the top ^

const express = require('express'),
      massive = require('massive'),
      session = require('express-session'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env,
      app = express(),
      authCtrl = require('./authController'),
      ctrl = require('./controller');

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60},
    secret: SESSION_SECRET
}))


massive(CONNECTION_STRING).then(db => {
    app.set('db',db)
    console.log('ya dun cunected to thuh daterbase')
})

//auth endpoints
app.post('/api/login', authCtrl.login); //all are posts cause they use a req.body
app.post('/api/register', authCtrl.register);
app.post('/api/logout', authCtrl.logout)
app.get('/api/user',authCtrl.getUser) //except this one

app.get('/api/posts/:id', ctrl.getPosts)

app.listen(SERVER_PORT, () => console.log(`Server running on ${SERVER_PORT}`));