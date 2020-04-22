
const express = require('express');
const app = express();
const query = require('./query');

const port = process.env.PORT || 3000;

// emergency shut down
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

    // localhost:3000 text
    app.get('/', (req, res) => {
        var responseMessage = 'This is Toolio Internship Coding Challenge.' +
                        'To test it, please pass your keyword to /search.' +
                        'Sample request:' +
                        'http://localhost:3000/search?key={your_keyword}';
        res.send(responseMessage); 
    });

    app.get('/search', (req, res) => {
        // calls when there is a search query
        // current query key is req.query.key
        console.log('--- new search ---');
        console.log(req.query);
        key = req.query.key;
        if (key == '' || key == null) {
            res.send('Please enter a keyword');
        } else {
            // use query.js to get proper items
            res.send(query(products, key));
        }
    });

    // listening localhost:3000
    const server = app.listen(port, () => console.log(`Listening on port: ${port}...`));

    // logging connections
    setInterval(() => server.getConnections(
        (err, connections) => console.log(`${connections} connections currently open`)
    ), 2000);
    
    // emergency shutdown
    process.on('SIGTERM', shutDown);
    process.on('SIGINT', shutDown);
    
    let connections = [];
    server.on('connection', connection => {
        connections.push(connection);
        connection.on('close', () => connections = connections.filter(curr => curr !== connection));
    });

}

module.exports = startServer;
