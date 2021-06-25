var sampleTimeSec=0.1;                  ///< sample time in sec
var sampleTimeMsec=0.1*1000;  ///< sample time in msec
const maxSamplesNumber = 20;               ///< maximum number of samples
var xdata; ///< x-axis labels array: time stamps
var ydata; ///< y-axis data array: random value
var xdata2; ///< x-axis labels array: time stamps
var ydata2; ///< y-axis data array: random value
var lastTimeStamp; ///< most recent time stamp 
var lastTimeStamp2;
var lastTimeStamp3; ///< most recent time stamp 
var xdata3; ///< x-axis labels array: time stamps
var ydata3;
var chartContext;  ///< chart context i.e. object that "owns" chart
var chart;         ///< Chart.js object
var chartContext2;  ///< chart context i.e. object that "owns" chart
var chart2;         ///< Chart.js object
var chartContext3;  ///< chart context i.e. object that "owns" chart
var chart3;
var timer; ///< request timer

const url = 'http://localhost/chartdata.json'; ///< server app with JSON API
const url2 = 'http://localhost/chartdata2.json'; ///< server app with JSON API
//const url = 'http://' + window.location.hostname + '/nocache/chartdata.json'

/**
* @brief Generate random value.
* @retval random number from range <-1, 1>
*/
function getRand() {
	const maxVal =  1.0;
	const minVal = -1.0;
	return (maxVal-minVal)*Math.random() + minVal;
}

/**
* @brief Add new value to next data point.
* @param y New y-axis value 
*/
function addData(y){
	if(ydata.length > maxSamplesNumber)
	{
		removeOldData();
		lastTimeStamp += sampleTimeSec;
		xdata.push(lastTimeStamp.toFixed(4));
	}
	ydata.push(y);
	chart.update();
}

function addData2(y){
	if(ydata.length > maxSamplesNumber)
	{
		removeOldData2();
		lastTimeStamp += sampleTimeSec;
		xdata2.push(lastTimeStamp.toFixed(4));
	}
	ydata2.push(y);
	chart2.update();
}
function addData3(y){
	if(ydata.length > maxSamplesNumber)
	{
		removeOldData3();
		lastTimeStamp += sampleTimeSec;
		xdata3.push(lastTimeStamp.toFixed(4));
	}
	ydata3.push(y);
	chart3.update();
}

/**
* @brief Remove oldest data point.
*/
function removeOldData(){
	xdata.splice(0,1);
	ydata.splice(0,1);
}
function removeOldData2(){
	xdata2.splice(0,1);
	ydata2.splice(0,1);
}
function removeOldData3(){
	xdata3.splice(0,1);
	ydata3.splice(0,1);
}

function changeSampleTime(){
	
	sampleTimeSec=$("#sampletime").val()/1000;
	sampleTimeMsec = 1000*sampleTimeSec;
	clearInterval(timer);
	chart.data=[];
	chart2.data=[];
	chart3.data=[];
	chart.labels=[];
	chart2.labels=[];
	chart3.labels=[];
	xdata=[];
	xdata2=[];
	xdata3=[];
	ydata=[];
	ydata2=[];
	ydata3=[];
	chartInit(sampleTimeSec);
    chartInit2(sampleTimeSec);
	chartInit3(sampleTimeSec);
}

/**
* @brief Start request timer
*/
function startTimer(){
	timer = setInterval(startALL, sampleTimeMsec);
}9


/**
* @brief Stop request timer
*/
function startALL()
{
	ajaxJSON();
	ajaxJSON2();
	ajaxJSON3();
}
	
function stopTimer(){
	clearInterval(timer);
}

/**
* @brief Send HTTP GET request to IoT server
*/
function ajaxJSON() {
	$.ajax(url, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addData(+responseJSON.data);
		}
	});
}

function ajaxJSON2() {
	$.ajax(url2, {
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addData2(+responseJSON.data);
		}
	});
}
function ajaxJSON3() {
	$.ajax(url, {                            //TU MOŻNA ZMIENIĆ URL
		type: 'GET', dataType: 'json',
		success: function(responseJSON, status, xhr) {
			addData3(+responseJSON.data);
		}
	});
}

/**
* @brief Chart initialization
*/
function chartInit()
{
	// array with consecutive integers: <0, maxSamplesNumber-1>
	xdata = [...Array(maxSamplesNumber).keys()]; 
	// scaling all values ​​times the sample time 
	xdata.forEach(function(p, i) {this[i] = (this[i]*sampleTimeSec).toFixed(4);}, xdata);

	// last value of 'xdata'
	lastTimeStamp = +xdata[xdata.length-1]; 

	// empty array
	ydata = []; 

	// get chart context from 'canvas' element
	chartContext = $("#chart")[0].getContext('2d');

	chart = new Chart(chartContext, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Humidity timeseries',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				data: ydata,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: '[0-1]'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
	});
	ydata = chart.data.datasets[0].data;
	xdata = chart.data.labels;
	
	// empty array
	ydata2 = []; 
	// get chart context from 'canvas' element
	chartContext2 = $("#chart2")[0].getContext('2d');
	chart2 = new Chart(chartContext2, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Temperature timeseries',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				data: ydata2,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Temperature [*C]'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
	});
	ydata2 = chart2.data.datasets[0].data;
	xdata2 = chart2.data.labels;
	
	ydata3 = []; 
	// get chart context from 'canvas' element
	chartContext3 = $("#chart3")[0].getContext('2d');
	chart3 = new Chart(chartContext3, {
		// The type of chart: linear plot
		type: 'line',

		// Dataset: 'xdata' as labels, 'ydata' as dataset.data
		data: {
			labels: xdata,
			datasets: [{
				fill: false,
				label: 'Temperature timeseries',
				backgroundColor: 'rgb(255, 0, 0)',
				borderColor: 'rgb(255, 0, 0)',
				data: ydata2,
				lineTension: 0
			}]
		},

		// Configuration options
		options: {
			responsive: true,
			maintainAspectRatio: false,
			animation: false,
			scales: {
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Temperature [*C]'
					}
				}],
				xAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Time [s]'
					}
				}]
			}
		}
	});
	ydata3 = chart3.data.datasets[0].data;
	xdata3 = chart3.data.labels;
	
	//$.ajaxSetup({ cache: false });
}



$(document).ready(() => { 
	chartInit();
	$("#start").click(startTimer);
	$("#stop").click(stopTimer);
	$("#chgSmpTime").click(changeSampleTime);
	//$("#sampletime").text(sampleTimeMsec.toString());
	$("#samplenumber").text(maxSamplesNumber.toString());
});