const express = require('express');
const app = express();
const port = 11277;

const MongoClient = require('mongodb').MongoClient;
const mongoUrl = 'mongodb://7litwin:pass7litwin@172.20.44.25:27017/7litwin';

var walidacja = require('./walidacja.js')

const client = new MongoClient(mongoUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db;

client.connect(function(err, client) {
    console.log(err);
    console.log("Connected correctly to server");
  
    db = client.db('7litwin');
  });

const b_login = "admin";
const b_haslo = "admin01";

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization")
    next();
});

app.post('/', async (req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, haslo] = new Buffer(b64auth, 'base64').toString().split(':');
    const result = await db.collection('users').findOne({login: {$eq: login}, haslo: {$eq: haslo}});
    if(result) res.send({status: 'successful'});
    else res.send({status: 'failure'});
});

app.post('/rejestracja', async (req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, haslo] = new Buffer(b64auth, 'base64').toString().split(':');
    const sprawdz = walidacja({login: login, haslo: haslo}, 'rejestracja');
    if(sprawdz !== 'ok') {
        res.send({status: 'failure', type: 'validate', data: sprawdz});
        return;
    }
    const isUser = await db.collection('users').findOne({login: {$eq: login}});
    if(isUser) {
        res.send({status: 'failure', type: 'validate', data: 'Login jest już zajęty'});
        return;
    }
    const result = await db.collection('users').insertOne({login: login, haslo: haslo});
    if(result) res.send({status: 'successful'});
    else res.send({status: 'failure'});
});

app.post('/notka', async (req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, haslo] = new Buffer(b64auth, 'base64').toString().split(':');
    var sprawdz = req.body.map(element => walidacja(element, 'notka')).filter(el => el !== 'ok');
    if(sprawdz.length) {
        res.send({status: 'failure', type: 'validate', data: sprawdz[0]});
        return;
    }
    const result = await db.collection('users').updateOne({login: {$eq: login}, haslo: {$eq: haslo}}, {$push: {notki: {$each: req.body}}});
    if(result.result.nModified) {
        res.send({status: 'successful'});
    } else {
        res.send({status: 'failure'});
    }
});

app.get('/notki', async (req, res) => {
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, haslo] = new Buffer(b64auth, 'base64').toString().split(':');
    const result = await db.collection('users').findOne({login: {$eq: login}, haslo: {$eq: haslo}});
    if(result) res.send({status: 'successful', data: result.notki});
    else res.send({status: 'failure'});
});

app.listen(port, () => console.log(`Serwer działa na porcie ${port}!`));