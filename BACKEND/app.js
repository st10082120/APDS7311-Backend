require('dotenv').config();
const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');
const hsts = require('./middleware/hsts');
const mongoose = require('mongoose')
const cors = require('cors')
//const Problem = require('./models/post')
const cert = fs.readFileSync('keys/certificate.pem');

const PORT = 3000;
const options = {
    server: { sslCA: cert }
};
app.use((reg, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', '*');
    next();
});
app.use(cors({ origin: 'http://localhost:4200' }));

//---------------------------------------------------------------\\
//DB
mongoose.connect(process.env.MONGODB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: { w: 'majority' } // Correct write concern
})
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });
//---------------------------------------------------------------\\
//middleware
app.use(helmet());
//app.use(cors({ origin: 'https://localhost:3000', optionSuccessStatus: 200 }));
app.use(express.json());
app.use(hsts);
//---------------------------------------------------------------\\
//routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/posts', require('./routes/posts'));
//---------------------------------------------------------------\\
//listen
const server = https.createServer(
    {
        key: fs.readFileSync('./keys/privatekey.pem'),
        cert: fs.readFileSync('./keys/certificate.pem'),
        passphrase: 'apds',
    },
    app
)
    .listen(PORT, () => {
        console.log(`HTTPS server is running on port ${PORT}`);
    });

server.on('error', (error) => {
    console.error('Server error:', error);
});

//---------------------------------------------------------------\\
module.exports = app;
//---------------------------End of file------------------------------------\\