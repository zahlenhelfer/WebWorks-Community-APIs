var UdpJNext,
    _event = require("../../lib/event");

module.exports = {
    getMemoryServer: function (success, fail, args, env) {
        try {
            success(UdpJNext.getMemoryJNext());
        } catch (e) {
            fail(-1, e);
        }
    },

    startSocket: function (success, fail, args, env) {
        try {
            success(UdpJNext.startSocket());
        } catch (e) {
            fail(-1, e);
        }
    },

    stopSocket: function (success, fail, args, env) {
        try {
            success(UdpJNext.stopSocket());
        } catch (e) {
            fail(-1, e);
        }
    },
    
	sendString: function (success, fail, args, env) {
        try {
            success(UdpJNext.sendString());
        } catch (e) {
            fail(-1, e);
        }
    },

    sendBytes: function (success, fail, args, env) {
        try {
            success(UdpJNext.sendBytes());
        } catch (e) {
            fail(-1, e);
        }
    },

};

///////////////////////////////////////////////////////////////////
// JavaScript wrapper for JNEXT plugin
///////////////////////////////////////////////////////////////////

JNEXT.UdpJNext = function ()
{   
    var _self = this;

    _self.startSocket = function (args) {
        return JNEXT.invoke(_self._id, "startSocketNative", args);
    };

    _self.stopSocket = function (args) {
        return JNEXT.invoke(_self._id, "stopSocketNative", args);
    };

    _self.sendString = function (args) {
        return JNEXT.invoke(_self._id, "sendStringNative", args);
    };

    _self.sendBytes = function (args) {
        return JNEXT.invoke(_self._id, "sendBytesNative", args);
    };


    _self.getId = function () {
        return _self._id;
    };

    _self.init = function () {
        if (!JNEXT.require("udpJnext")) {
            return false;
        }

        _self._id = JNEXT.createObject("udpJnext.Udp");

        if (!_self._id || _self._id === "") {
            return false;
        }

        JNEXT.registerEvents(_self);
    };

    _self.onEvent = function (strData) {
        var arData = strData.split(" "),
            strEventId = arData[0],
            arg = arData[1];

        // Trigger the event handler of specific Push events
        if (strEventId === "FreeMemory") {
            _event.trigger("example.memory.memoryEvent", arg);
        }
    };
    
    _self._id = "";
    
    _self.init();
};

udpJNext = new JNEXT.UdpJNext();
