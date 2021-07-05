var jsonLedMatrix;

var savedConfigData="/config.json";
var ledScript="/l08zad2php.php"; 
var ip;
var port;

var r=0;
var g=0;
var b=0;

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
    port=responseJSON.port;
	ledScript= "http://"+ip+ledScript;
}


/**
 * @brief Gets value from sliders and creates color
 * @param key: information which slider was moved
 */
function getSliderValue(key){
	
	switch(key){

		case 'r':
			r=$('#rSlider').val();
			if(r===undefined){r=0;}

		break;

		case 'g':
			g=$('#gSlider').val();
			if(g===undefined){g=0;}

		break;

		case 'b':
			b=$('#bSlider').val();
			if(b===undefined){b=0;}

		break;

		default: {console.log("Can't read slider's value");}

	}

	let color = "rgb(" + r + ", " + g + ", " + b + ")";
	console.log(color);
	updateDivsBackground(color);
	
}

/**
 * @brief Updates color of div that shows chosen color
 * @param color: string that contains color as rgb
 */
 function updateDivsBackground(color){
    $('#ColorDiv').css("background-color", color);

}

/**
 * @brief Updates background color of clicked button in matrix
 * @param id: information which button in matrix was clicked
 */
function updateBtn(id){
	let color = $('#ColorDiv').css("background-color");
	let idJQ = "#"+id;
	$(idJQ).css("background-color", color);
	$('#infoFromServer').text("Data not sent");
}


/**
 * @brief Ceates led matrix and sends data to server
 */
 function sendLED(){
	var row = 0;
	var column = 0;
	var id;
	var ledMatrix= [];
	


for(id=1; id < 65; id++)
{

	var rgbMatrix = [];
	var newid = "#" +id;

	var color = $(newid).css("background-color");
	var rgb = color.replace(/[^\d,]/g, '').split(',');


	
	var redDec = parseInt(rgb[0]);
	var greenDec = parseInt(rgb[1]);
	var blueDec = parseInt(rgb[2]);
	
	if((id-1)%8==0 && id!=0)
	{
		row ++;
		column=0;
	}
	
	rgbMatrix.push(column);
	rgbMatrix.push(row-1);
	rgbMatrix.push(redDec);
	rgbMatrix.push(greenDec);
	rgbMatrix.push(blueDec);
	ledMatrix.push(rgbMatrix);
	column = column+1;

}
jsonLedMatrix = JSON.stringify(ledMatrix);



	$.ajax(ledScript,{  
	type: "POST",
    data: {myarray: jsonLedMatrix },
	dataType: "text",
	crossDomain: true,
	cache: false,
	});
	
	$('#infoFromServer').text("Data sent");
	
};
/**
 * @brief Resets all leds to default colour
 */
function resetLED ()
{

	var row = 0;
	var column = 0;
	var id;
	var ledMatrix= [];
	

	for(id=1; id < 65; id++)
	{
		var actId = "#" + id;
		$(actId).css("background-color", "white");

		let rgbMatrix = [];

		if((id-1)%8==0 && id!=0)
		{
			row ++;
			column=0;
		}

			
		rgbMatrix.push(row-1);
		rgbMatrix.push(column);
		rgbMatrix.push(0);
		rgbMatrix.push(0);
		rgbMatrix.push(0);
		ledMatrix.push(rgbMatrix);
		column = column+1;


	}

	jsonLedMatrix = JSON.stringify(ledMatrix);



	$.ajax(ledScript,{  
	type: "POST",
    data: {myarray: jsonLedMatrix },
	dataType: "text",
	crossDomain: true,
	cache: false,
	});

	$('#infoFromServer').text("Data not sent");
}
