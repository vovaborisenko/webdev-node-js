const http = require('http');

const PORT = 3000;

const server = http.createServer((req, res) => {
    console.log(`Server request ${req.method} ${req.url}`);

    res.setHeader('Content-Type', 'application/json');
    
    // res.write('<head><style>body { font-size: 24px }</style></head>')
    // res.write('<h1>Hello World!</h1>');
    // res.write('<p>Hello World!</p>');
    const data = JSON.stringify([
        {id: 1, name: 'Nick', age: 20},
        {id: 3, name: 'John', age: 32},
    ])

    res.end(data);
})

server.listen(PORT, (err) => {
    if (err) return console.log('Error: ', err);

    console.log(`Server listening: http://localhost:${PORT}`);
})
