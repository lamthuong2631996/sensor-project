const temperatureCanvasCtx =
document.getElementById('temperature-chart').getContext('2d')
const temperatureChartConfig = {
type: 'line',
data: {
labels: [],
datasets: [{
data: [],
backgroundColor: 'rgba(255, 205, 210, 0.5)'
}]
},
options: {
legend: {
display: false
},
responsive: true,
maintainAspectRatio: false,
scales: {
yAxes: [{
ticks: {
suggestedMin: 10,
suggestedMax: 40
}
}]
}
}
}
const temperatureChart = new Chart(temperatureCanvasCtx,
temperatureChartConfig)
const humidityCanvasCtx =
document.getElementById('humidity-chart').getContext('2d')
const humidityChartConfig = {
type: 'line',
data: {
labels: [],
datasets: [{
data: [],
backgroundColor: 'rgba(197, 202, 233, 0.5)'
}]
},
options: {
legend: {
display: false
},
responsive: true,
maintainAspectRatio: false,
scales: {
yAxes: [{
ticks: {
suggestedMin: 30,
suggestedMax: 90
}
}]
}
}
}
const humidityChart = new Chart(humidityCanvasCtx,
humidityChartConfig)
const pushData = (arr, value, maxLen) => {
arr.push(value)
if (arr.length > maxLen) {
arr.shift()
}
}
const humidityDisplay =
document.getElementById('humidity-display')
const temperatureDisplay =
document.getElementById('temperature-display')
const fetchTemperature = () => {
    fetch('/temperature')
    .then(results => {
    return results.json()
    })
    .then(data => {
    const now = new Date()
    const timeNow = now.getHours() + ':' +
    now.getMinutes() + ':' + now.getSeconds()
    pushData(temperatureChartConfig.data.labels,
    timeNow, 10)
    pushData(temperatureChartConfig.data.datasets[0]
    .data, data.value, 10)
    temperatureChart.update()
    temperatureDisplay.innerHTML = '<strong>' +
    data.value + '</strong>'
    })
    }
    const fetchHumidity = () => {
    fetch('/humidity')
    .then(results => {
    return results.json()
    })
    .then(data => {
    const now = new Date()
    const timeNow = now.getHours() + ':' +
    now.getMinutes() + ':' + now.getSeconds()
    pushData(humidityChartConfig.data.labels, timeNow,
    10)
    pushData(humidityChartConfig.data.datasets[0].data,
    data.value, 10)
    humidityChart.update()
    humidityDisplay.innerHTML = '<strong>' + data.value
    + '</strong>'
    })
    }
    setInterval(() => {
    fetchTemperature()
    fetchHumidity()
    }, 2000)
    /**
* First, define a function that will initialize the
socket connection and add listeners
* to the required events
*/
const addSocketListeners = () => {
    /**
    * The "io" constructor is available to us after
    including the socket.io library script in the "index.html" file
    * Initializing the socket connection is as easy as the
    statement below
    */
const socket = io()
    /**
    * An event listener is attached to the "newtemperature" event
    * The handler is similar to the handler that was attached
    to the GET /temperature API, so in essence, we are
    replacing the API call with the socket event notification
    */
socket.on('new-temperature', data => {
const now = new Date()
const timeNow =
now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds()
pushData(temperatureChartConfig.data.labels, timeNow, 10)
pushData(temperatureChartConfig.data.datasets[0].data,data.value, 10)
temperatureChart.update()
temperatureDisplay.innerHTML = '<strong>' +
data.value + '</strong>'
})
/**
* Similarly, we add the handler for the "new-humidity"
event
*/
socket.on('new-humidity', data => {
const now = new Date()
const timeNow =
now.getHours() + ':' + now.getMinutes() + ':' +
now.getSeconds()
pushData(humidityChartConfig.data.labels, timeNow, 10)
pushData(humidityChartConfig.data.datasets[0].data, data.value, 10)
humidityChart.update()
humidityDisplay.innerHTML = '<strong>' + data.value +
'</strong>'
})
}
if (!getParameterByName('start') && !getParameterByName('end')) {
/**
* Finally, the fetchHumidity and fetchTemperature
functions, that used to call the APIs at regular intervals, are
removed.
* In their place, the addSocketListeners function is
called (and only needs to be called once this time)
*/
addSocketListeners()
// setInterval(() => {
// fetchTemperature()
// fetchHumidity()
// }, 2000)
fetchHumidityHistory()
fetchTemperatureHistory()
} else {
fetchHumidityRange()
fetchTemperatureRange()
}