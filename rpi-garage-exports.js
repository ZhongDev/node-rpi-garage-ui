/// requires
require('dotenv').config()                              /// dotenv
var rateLimit = require('ws-rate-limit')('60s', 600)    /// ws-rate-limit
const Gpio = require('onoff').Gpio;                     /// onoff

/// dotenv imports
const KEY = process.env.KEY || '1234'                   /// verification of status
const PIN = process.env.PIN || '000000'                 /// PIN number
const GPIO = parseInt(process.env.GPIO) || 7            /// GPIO pin

/// package configs
const relay = new Gpio(GPIO, 'out');                    /// set imported GPIO pin

/// global variables
var isRunning = false;                                  /// tracking variable for opendoor()

function opengarage(){
    if(!isRunning){
        isRunning = true
        relay.writeSync(1)
        setTimeout(function(){
            relay.writeSync(0)
            isRunning = false
        },100)
    }
}

class handler {
    static get(req, res){
        res.render('pages/index', {
            dotslength: PIN.length.toString()
        })
    }
    static ws(ws, req){
        rateLimit(ws)
        ws.on('message', function (message){
            try {
                message = JSON.parse(message);
            } catch (e) {
                console.error(e)
                return false;
            }
            if(message.key == KEY && message.pin == PIN){
                opengarage()
                ws.send(200)
            }else{
                ws.send(401)
            }
        })
        ws.on('limited', function(){
            ws.send(500)
        })
    }
}

module.exports = {handler}