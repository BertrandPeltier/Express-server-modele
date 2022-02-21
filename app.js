require('dotenv').config();
const express = require('express');
const cors = require('cors');

const routers = require('./app/routers');
const bodySanitizer = require('./app/middlewares/bodySanitizer');

const app = express();
app.use(cors('*'));
app.use(express.urlencoded({extended:true}));

app.use(express.json());
app.use(routers);
// Middleware permettant de "nettoyer" le body = écarte les caractères HTML
app.use(bodySanitizer);

// Lancement du server
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});