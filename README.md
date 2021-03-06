# node-rpi-garage-ui
node-rpi-garage-ui is a User Interface for a Raspberry Pi garage door opener.

# Installation
You'll need to first install [nodeJS](https://nodejs.org/en/download/ "Click here to goto the nodeJS download page") on the Raspberry Pi you plan to use this on.</br>

Then open a terminal and type</br> 
```git clone https://github.com/ZhongDev/node-rpi-garage-ui.git```</br>
```cd node-rpi-garage-ui```</br>
```npm install```</br>

To run the server, type ```node rpi-garage.js``` into the terminal, then in a browser on a touch device, open the ip of your Raspberry Pi.</br>

## NOTE
For the application to properly store cookies, you will need to point a domain to your local ip, or setup a domain redirect with a custom dns on your touch device.

# Electronics wiring
To wire a Relay switch to the Raspberry Pi, first provide power to the relay by connecting the positive and negative terminals to a corresponding power source, then connect the signal pin to any available GPIO pin on the Raspberry Pi. Then connect wires to the relay in the **Normally Open** or **NO** pair to the switch terminals on the garage door.

# Example .env file
You'll need a .env file in the `node-rpi-garage-ui` folder to setup your own pin, verification password (key). You can also change the port the website runs on and the GPIO signal pin for the relay.
```
PIN=000000
KEY=apresharedkey
GPIO=7
PORT=80
```

# Setting up preshared key on client
To setup the preshared key on the client, press "Enter Passcode" 11 times. A popup will show your current key and will allow you to modify it as well.
