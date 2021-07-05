var savedConfigData="/config.json";
var joystickData="/datajoystick123.json"; 
var ip;
var timer;
var sampleTime;

$(document).ready(() => { 
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

    });

}



/**
 * @brief Update config values with data downloaded from server
 * @param responseJSON: data structure that keeps information about configuration
 */
function updateConfigValues(responseJSON){
    ip=responseJSON.ip;
    sampleTime=responseJSON.sampleTime;
    savedConfigData= "http://"+ip+savedConfigData;
	joystickData= "http://"+ip+joystickData;
    console.log("Config values updated");
}


/**
 * @brief Gets chosen data from server
 * @param dataURL: URL of json file to download
 */
 function getDataRequest(dataURL){

    $.ajax(joystickData, {
        type: 'GET',
        dataType: 'json',
        crossDomain: true,
        cache: false,
        async : true,
        success: function(responseJSON, status, xhr) {
            
			displayJoystick(responseJSON);

        },

    });


}


/**
 * @brief Start timer that downloads data
 */
 function startTimer(){
    timer=setInterval(getDataRequest, sampleTime);
}

/**
 * @brief Stop timer that downloads data
 */
 function stopTimer(){
    clearInterval(timer);

    $('#joyUP').css("background-color", "LightGrey");
    $('#joyDOWN').css("background-color", "LightGrey");
    $('#joyLEFT').css("background-color", "LightGrey");
    $('#joyRIGHT').css("background-color", "LightGrey");
    $('#joyNONE').css("background-color", "LightGrey");
}


function displayJoystick(responseJSON){

    switch(responseJSON.Action){

        case("pressed"):

            $('#joyUP').css("background-color", "#E8E8E8");
            $('#joyDOWN').css("background-color", "#E8E8E8");
            $('#joyLEFT').css("background-color", "#E8E8E8");
            $('#joyRIGHT').css("background-color", "#E8E8E8");
            $('#joyNONE').css("background-color", "#E8E8E8");

            switch(responseJSON.Direction){
                
                case("left"):
                    $('#joyLEFT').css("background-color", "DarkGrey");
                break;

                case("right"):
                    $('#joyRIGHT').css("background-color", "DarkGrey");
                break;

                case("up"):
                    $('#joyUP').css("background-color", "DarkGrey");
                break;

                case("down"):
                    $('#joyDOWN').css("background-color", "DarkGrey");
                break;

                case("middle"):
                    $('#joyNONE').css("background-color", "DarkGrey");
                break;

            }
        break;
        

        case("held"):

        $('#joyUP').css("background-color", "#E8E8E8");
        $('#joyDOWN').css("background-color", "#E8E8E8");
        $('#joyLEFT').css("background-color", "#E8E8E8");
        $('#joyRIGHT').css("background-color", "#E8E8E8");
        $('#joyNONE').css("background-color", "#E8E8E8");

            switch(responseJSON.Direction){
                
                case("left"):
                    $('#joyLEFT').css("background-color", "Grey");
                break;

                case("right"):
                    $('#joyRIGHT').css("background-color", "Grey");
                break;

                case("up"):
                    $('#joyUP').css("background-color", "Grey");
                break;

                case("down"):
                    $('#joyDOWN').css("background-color", "Grey");
                break;

                case("middle"):
                    $('#joyNONE').css("background-color", "Grey");
                break;

            }
        break;

        case('released'):
            $('#joyUP').css("background-color", "#E8E8E8");
            $('#joyDOWN').css("background-color", "#E8E8E8");
            $('#joyLEFT').css("background-color", "#E8E8E8");
            $('#joyRIGHT').css("background-color", "#E8E8E8");
            $('#joyNONE').css("background-color", "#E8E8E8");

        break;


        default:{};


    }
    



}