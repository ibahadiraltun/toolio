
const express = require('express');
const app = express();
const query = require('./query');

const port = process.env.PORT || 3000;

function shutDown() {
    console.log('Received kill signal, shutting down');
    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });

    setTimeout(() => {
        console.error('Could not close connections in time, forced shutting down');
        process.exit(1);
    }, 10000);

    connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

function startServer(products) {

    app.get('/', (req, res) => {
        var responseMessage = 'This is Toolio Internship Coding Challenge.' +
                        'To test it, please pass your keyword to /search.' +
                        'Sample request:' +
                        'http://localhost:3000/search?key={your_keyword}';
        res.send(responseMessage); 
    });

    app.get('/search', (req, res) => {
        console.log('--- new search ---');
        console.log(req.query);
        key = req.query.key;
        if (key == '' || key == null) {
            res.send('Please enter a keyword');
        } else {
            res.send(query(products, key));
        }
    });

    const server = app.listen(port, () => console.log(`Listening on port: ${port}...`));

    setInterval(() => server.getConnections(
        (err, connections) => console.log(`${connections} connections currently open`)
    ), 2000);
    
    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);
    
    let connections = [];
    
    server.on('connection', connection => {
        connections.push(connection);
        connection.on('close', () => connections = connections.filter(curr => curr !== connection));
    });

}

module.exports = startServer;
