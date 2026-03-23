const http = require('http');
const nodeStatic = require('node-static');
const {Notifications} = require('./prefixes/Notifications');

class App {
    start() {
        this.startServer();
        new Notifications().start(this.server);
    }

    startServer() {
        this.server = http.createServer((req, res) => {
            if(req.url === '/api/custom/on-premise-socket') {
                res.end(JSON.stringify({code: 200,  message: "Success"}));
            }
        });
        const staticDirectory = new nodeStatic.Server(`${__dirname}/../public`);
        this.server.addListener('request', (req, res) => {
            staticDirectory.serve(req, res);
        });
        this.server.addListener('upgrade', (req, res) => {
            res.end();
        });

        this.server.listen(process.env.PORT);
        console.info(`Listening on http://localhost:${process.env.PORT}`);
    }
}

module.exports.App = App;