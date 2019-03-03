const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : process.env.DATABASE_URL,
        ssl: true
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => res.send("it is working"));

app.post('/signin', (req, res) => {
    signin.handleSignin(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
    profile.handleProfileGet(req, res, db);
});

app.post('/register', (req, res) => { 
    register.handleRegister(req, res, db, bcrypt);
});

app.put('/image', (req, res) => { 
    image.handleImage(req,res, db);
});
app.post('/imageurl', (req, res) => { 
    image.handleApiCall(req,res);
});

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`Server is listening on port ${PORT}`);
});