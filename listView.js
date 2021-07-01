var ipFromBrowser;
var savedConfigData="/config.json";
var joystickDataURL="/joystick.json";
var DataListURL="/datalist.json";

var sampleTime;
var sampleQuantity;
var ip;
var port;
var timer;




var indexJSON=JSON.parse("{\"temp\":0, \"press\":0, \"humi\":0, \"roll\":0, " +
    "\"pitch\":0, \"yaw\":0, \"x\":0, \"y\":0, \"z\":0}");





$(document).ready(function(){

    ipFromBrowser=self.location.hostname
    console.log(ipFromBrowser);
    getConfigDataFromServer();


});



/**
 * @brief Download config data from server and starts updateConfigValues function.
 */
function getConfigDataFromServer() {
    $.ajax(savedConfigData, {
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        cache: false,
        success: function(responseJSON, status, xhr) {
            updateConfigValues(responseJSON);
        },
        error: function (ajaxContext) {
            console.log("Error while getting data from server");
        },

    }).done(function(html){
    updateTableConfig()
});

}



/**
 * @brief Update config values with data downloaded from server
 * @param responseJSON: data structure that keeps information about configuration
 */
function updateConfigValues(responseJSON){
    ip=responseJSON.ip;
    port=responseJSON.port;
    sampleTime=responseJSON.sampleTime;
    sampleQuantity=responseJSON.sampleQuantity;

    joystickDataURL="http://"+ip+joystickDataURL;
    DataListURL="http://"+ip+DataListURL;


    console.log("Config values updated");
}



/**
 * @brief Update table content to plot and calls function to start timer
 */
function updateTableConfig(){
   createTable();
}

/**
 * @brief Start timer that downloads data
 */
function startTimer(){
    timer=setInterval(getData, sampleTime);
}

/**
 * @brief Stop timer that downloads data
 */
 function stopTimer(){
    clearInterval(timer);
}



/**
 * @brief Gets chosen data from server
 * @param dataURL: URL of json file to download
 * @param key: information what data was downloaded
 */
function getDataRequest(dataURL,key){
    $.ajax(dataURL, {
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        cache: false,
        async : true,
        success: function(responseJSON, status, xhr) {
            updateTable(responseJSON,key)

        },
        error: function (ajaxContext) {
            console.log("Error while getting data from server");
        },

    });


}

/**
 * @brief Gets data from server, calls getDataRequest function
 * and updateTable function
 */
function getData(){


        getDataRequest(joystickDataURL,"joy");
        getDataRequest(DataListURL,"data");


}

/**
 * @brief Updates data in table
 * @param data: new downloaded json data
 * @param local_key: key used to choose which data update
 */
function updateTable(data,key){

    var table=document.getElementById("table");

    switch(key){

        case "data":

            table.rows[indexJSON.pitch].cells[0].innerHTML = data[0].name;
            table.rows[indexJSON.pitch].cells[1].innerHTML = data[0].value;
            table.rows[indexJSON.pitch].cells[2].innerHTML = data[0].unit;

            table.rows[indexJSON.yaw].cells[0].innerHTML =data[1].name;
            table.rows[indexJSON.yaw].cells[1].innerHTML =data[1].value;
            table.rows[indexJSON.yaw].cells[2].innerHTML =data[1].unit;

            table.rows[indexJSON.roll].cells[0].innerHTML =data[2].name;
            table.rows[indexJSON.roll].cells[1].innerHTML =data[2].value;
            table.rows[indexJSON.roll].cells[2].innerHTML =data[2].unit;

            table.rows[indexJSON.temp].cells[0].innerHTML = data[3].name;
            table.rows[indexJSON.temp].cells[1].innerHTML = data[3].value;
            table.rows[indexJSON.temp].cells[2].innerHTML = data[3].unit;

            table.rows[indexJSON.humi].cells[0].innerHTML = data[4].name;
            table.rows[indexJSON.humi].cells[1].innerHTML = data[4].value;
            table.rows[indexJSON.humi].cells[2].innerHTML = data[4].unit;

            table.rows[indexJSON.press].cells[0].innerHTML = data[5].name;
            table.rows[indexJSON.press].cells[1].innerHTML = data[5].value;
            table.rows[indexJSON.press].cells[2].innerHTML = data[5].unit;
            
            
           
           
            break;

        case "joy":
            table.rows[indexJSON.direction].cells[1].innerHTML = data.Direction;
            table.rows[indexJSON.direction].cells[2].innerHTML = data.Action;
            break;

        default:
            console.log("error: No data to update chosen")
    }

}

/**
 * @brief Generates table
 */
function createTable(){

    var data = [];

    data.push(["Name", "Value", "Unit"]);


    data.push(["Temperature", "---", 'C']);		indexJSON.temp=1;
    data.push(["Pressure", "---", 'mbar']);		indexJSON.press=2;
    data.push(["Humidity", "---", '%']); 		indexJSON.humi=3;
    data.push(["Roll", "---", 'degrees']);		indexJSON.roll=4;
    data.push(["Pitch", "---", 'degrees']);		indexJSON.pitch=5;
    data.push(["Yaw", "---", 'degrees']);		indexJSON.yaw=6;
    data.push(["Joystick", "---", '[-]']);	    indexJSON.direction=7;
   

    //Create table element and format it
    var table = document.createElement('table');
    table.style.width = '100%';
    table.setAttribute('border', '1');
    table.id="table";
    table.style.fontSize="20px";


    var columnsNumber = data[0].length;

    //Add the header row.
    //Insert row at the end of the current table
    var row = table.insertRow(-1);

    for (var i = 0; i < columnsNumber; i++) {
        var headerCell = document.createElement("TH");
        headerCell.innerHTML = data[0][i];
        row.appendChild(headerCell);
    }

    //Add the data rows.
    for (var i = 1; i < data.length; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < columnsNumber; j++) {
            var cell = row.insertCell(-1);
            cell.innerHTML = data[i][j];
        }
    }

    //Set table in html file
    var container = document.getElementById('TableDiv');
    container.innerHTML = "";
    container.appendChild(table);

}









