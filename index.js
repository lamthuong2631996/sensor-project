const express = require('express')
const path = require('path')
const app = express()
const getCachedSensorReadings = require('./get-cached-sensor-readings')
app.use('/public', express.static(path.join(__dirname, 'public')))
app.get('/temperature', function (req, res) {
res.json({
value:
getCachedSensorReadings.getTemperature().toFixed(1)
})
})
app.get('/humidity', function (req, res) {
res.json({
value: getCachedSensorReadings.getHumidity().toFixed(1)
})
})
app.listen(3000, function () {
console.log('Server listening on port 3000')
})


/**
* Import the external dependencies required, for us this
is:
* 1. The native http module
* 2. The socket.io module that we installed
* 3. The subscribe and unsubscribe functions from the
notifier module
*/
const http = require('http')
const socketIo = require('socket.io')
const {subscribe, unsubscribe} = require('./notifier')
/**
* Create a new HTTP server that wraps the "app" object
that defined our server
*/
const httpServer = http.Server(app)
/**
* Socket.io implements its own routes on top of the
existing ones by wrapping our HTTP server
*/
const io = socketIo(httpServer)
io.on('connection', socket => {
/**
* This callback is called every time a new client
successfully makes a websocket connection with our server
*/
console.log(`User connected [${socket.id}]`)
/**
* The event listeners are defined inside the callback
function because we need to access the "socket" instance,
to emit changes to the client
* The "pushTemperature" and "pushHumidity" listeners
are called on change of temperature and humidity
respectively.
*/
const pushTemperature = newTemperature => {
socket.emit('new-temperature', {
value: newTemperature
})
}
const pushHumidity = newHumidity => {
socket.emit('new-humidity', {
value: newHumidity
})
}
/**
* Subscribe the listeners that we just defined to the
"temperature" and "humidity" events
*/
subscribe(pushTemperature, 'temperature')
subscribe(pushHumidity, 'humidity')
socket.on('disconnect', () => {
/**
* Finally, when the connection is closed,
unsubscribe the listeners from their events
*/
unsubscribe(pushTemperature, 'temperature')
unsubscribe(pushHumidity, 'humidity')
})
})
/**
* The httpsServer.listen method is called. This exposes
the routes we defined for the "app" instance as well
*/
httpServer.listen(3000, function () {
console.log('Server listening on port 3000')
})
/**
* The app.listen method invocation from the previous
version is removed, in place of the httpServer.listen
method
*/
// app.listen(3000, function () {
// console.log('Server listening on port 3000')
// })
