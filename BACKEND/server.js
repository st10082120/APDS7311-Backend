const https = require('https');
const express = require('express')
const app = require('./app');
//const ap = express();
const fs = require('fs');
const PORT = 3000;

/*const server = https.createServer({
    key: fs.readFileSync('keys/privatekey.pem'),
    cert: fs.readFileSync('keys/certificate.pem')
},
    app);*/
/*const server = https.createServer(
    {
        key: fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem'),
        passphrase: 'apds',
    },
    ap
)
    .listen(PORT,  () => {
        console.log(`HTTPS server is running on port ${PORT}`);
    });*/

app.get('/', (req, res) => {
    res.send('hello world express');
});
//app.listen(PORT)
/*

server.on('error', (error) => {
    console.error('Server error:', error);
});*/