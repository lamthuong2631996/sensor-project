const temperatureCanvasCtx = document.getElementById('temperature-chart').getContext('2d')
const temperatureChartConfig = {
type: 'line',
data: {
labels: [],
datasets: [
{
data: [],
backgroundColor: 'rgba(255, 205, 210, 0.5)'
}
]
},
options: {
legend: {
display: false
},
responsive: true,
maintainAspectRatio: false,
scales: {
yAxes: [
{
ticks: {
suggestedMin: 10,
suggestedMax: 40
}
}
]
}
}
}
const temperatureChart = new Chart(temperatureCanvasCtx, temperatureChartConfig)
const humidityCanvasCtx = document.getElementById('humidity-chart').getContext('2d')
const humidityChartConfig = {
type: 'line',
data: {
labels: [],
datasets: [
{
data: [],
backgroundColor: 'rgba(197, 202, 233, 0.5)'
}
]
},
options: {
legend: {
display: false
},
responsive: true,
maintainAspectRatio: false,
scales: {
yAxes: [
{
ticks: {
suggestedMin: 30,
suggestedMax: 90
}
}
]
}
}
}
const humidityChart = new Chart(humidityCanvasCtx, humidityChartConfig)
const pushData = (arr, value, maxLen) => {
arr.push(value)
if (arr.length > maxLen) {
arr.shift()
}
}
const humidityDisplay = document.getElementById('humidity-display')
const temperatureDisplay = document.getElementById('temperature-display')
const fetchTemperature = () => {
}
const fetchHumidity = () => {
}
const fetchTemperatureHistory = () => {
}
const fetchHumidityHistory = () => {
}
/**
* We first define a function to extract the parameters
from the request query.
* You do not need to be concerned too much with its
implementation, although you could always study it as an exercise.
*/
function getParameterByName (name) {
const url = window.location.href
name = name.replace(/[\[\]]/g, '\\$&')
const regex = new RegExp('[?&]' + name + '(= ([^&#]*)|&|#|$)')
const results = regex.exec(url)
if (!results) return null
if (!results[2]) return ''
return decodeURIComponent(results[2].replace(/\+/g, ''))
}
const fetchTemperatureRange = () => {
}
const fetchHumidityRange = () => {
}
if (!getParameterByName('start') && !getParameterByName('end')) {
/**
* The fetchTemperature and fetchHumidity calls are now
moved here
* and are called only when the "start" and "end"
parametes are not present in the query
* In this case, we will be showing the live reading
implementation
*/
setInterval(() => {
    fetchTemperature()
    fetchHumidity()
    }, 2000)
    fetchHumidityHistory()
    fetchTemperatureHistory()
    } else {
    /**
    * If we do have these parameters, we will only be
    showing the range of readings requested by calling the functions
    we defined in this section
    */
    fetchHumidityRange()
    fetchTemperatureRange()
    }