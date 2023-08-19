const http = require('http');
const fs = require('fs');
const _ = require('lodash');

const server = http.createServer((req,res)=> {
    console.log(req.method);

    fs.readFile('./index.html',(err,data)=>{
        res.setHeader('content_Type','text/html');
        //res.write(data);
        res.end(data);
    });
    //res.write('Hello, world!!!');
    //res.end();
});

server.listen(3000, 'localhost', ()=>{
    console.log('Listening....');
});