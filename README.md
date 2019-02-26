# node-rpi-garage-ui
node-rpi-garage-ui is a User Interface for a Raspberry Pi garage door opener.

# Installation
You'll need to first install [nodeJS](https://nodejs.org/en/download/ "Click here to goto the nodeJS download page") on the Raspberry Pi you plan to use this on.</br>

Then open a terminal and type</br> 
```git clone https://github.com/ZhongDev/node-rpi-garage-ui.git```</br>
```cd node-rpi-garage-ui```</br>
```npm install```</br>

To run the server, type ```node rpi-garage.js``` into the terminal, then open on a touch device the ip of your Raspberry Pi.</br>

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