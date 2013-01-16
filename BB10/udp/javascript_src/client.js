 
var _self = {},
    _ID = require("./manifest.json").namespace;


// Starts the socket. Takes a dictionary with the following values:
// int port: The port on which to listen.
_self.startSocket = function (dict) {
    window.webworks.event.add(_ID, "de.zhapps.udp.startSocket", dict);

    return window.webworks.execSync(_ID, "start", null);
};

// Stops listening for and sending network traffic.
_self.stopSocket = function () {
    return window.webworks.execSync(_ID, "stopSocket", null);
};

// Sends a string of data over UDP. Takes a dictionary with the following values:
//  string host [optional]: The host address to which data will be sent. Broadcasts if no host is specified.
//  int port [optional]: The port on which to listen. Uses the port the socket was created with if not specified.
//  string data: The string to send.
_self.sendString = function (dict) {
    window.webworks.event.add(_ID, "de.zhapps.udp.sendString", dict);

    return window.webworks.execSync(_ID, "sendString", null);
};

//Sends bytes over UDP. Takes a dictionary with the following values:
// string host [optional]: The host address to which data will be sent. Broadcasts if no host is specified.
// int port [optional]: The port on which to listen. Uses the port the socket was created with if not specified.
// int[] data: The bytes to send.

_self.sendBytes = function (dict) {
    window.webworks.event.add(_ID, "de.zhapps.udp.sendBytes", dict);

    return window.webworks.execSync(_ID, "sendBytes", null);
};

module.exports = _self;

/*

NEEDS TO BE DONE:

Events

- started
Fired when the socket has finished initializing and it is ready to be used.

- data
Fired when data is received. A dictionary is provided with the following values:
string stringData: A string representation of the data received; may or may not be accurate, depending on the data sent.
int[] bytesData: A bytes representation of the data received; may or may not be accurate, depending on the data sent.
string address: The raw address received.

- error
Fired when an error is encountered. A dictionary is provided with the following values:
string error: The error

*/
