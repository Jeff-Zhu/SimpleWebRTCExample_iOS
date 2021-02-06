"use strict";

let WebSocketServer = require('ws').Server;
let port = 8080;
const ip = require('ip');

const args = process.argv.slice(2)
var ipaddr
if (args.length == 1) {
    console.log('ipaddress given = ' + args)
    ipaddr = args[0]
} else {
    ipaddr = ip.address()
    console.log('ipaddress not given, use ip.address() ' + ipaddr)
}

let wsServer = new WebSocketServer({ port: port, host : ipaddr });
console.log('websocket server start.' + ' ipaddress = ' + ipaddr + ' port = ' + port);

wsServer.on('connection', function (ws) {
    console.log('-- websocket connected --');

    ws.on('message', function (message) {
        console.log('-- message recieved --');
        const json = JSON.parse(message.toString());
        console.log(json)
        wsServer.clients.forEach(function each(client) {
            if (isSame(ws, client)) {
                console.log('skip sender');
            }
            else {
                client.send(message);
            }
        });
    });

});

function isSame(ws1, ws2) {
    // -- compare object --
    return (ws1 === ws2);
}
