import express from 'express';
import { join } from 'path';
import serveStatic from 'serve-static';

var app = express()
app.use(serveStatic(join(__dirname, '/public')))

var port = process.env.PORT || 5000
app.listen(port)
console.log('server started ' + port)