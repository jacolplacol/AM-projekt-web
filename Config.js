var optionsMatrix = [];
var savedConfigData="/config.json";
var saveConfigScript="/setConfig.php";



$(document).ready(function(){
	
	urlFromBrowser=self.location.hostname;
	savedConfigData="http://"+urlFromBrowser+savedConfigData;
	saveConfigScript="http://"+urlFromBrowser+saveConfigScript;
	getConfigDataFromServer()
	
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
				console.log(responseJSON)
				updateConfigValues(responseJSON);
			},
			error: function (ajaxContext) {
				console.log("Error while getting data from server");
			},
			
		});
 
}




/**
 * @brief Update content o displayed config with data downloaded from server
 * @param responseJSON: data structure that keeps information about configuration
 */
function updateConfigValues(responseJSON){
	document.getElementById("IP_Adress").value=responseJSON.ip;
	document.getElementById("Port").value=responseJSON.port;
	document.getElementById("SampleTime").value=responseJSON.sampleTime;
	document.getElementById("SampleQuantity").value=responseJSON.sampleQuantity;
	document.getElementById("configAPI").value=responseJSON.api;
	console.log("Config data updated");

}

/**
 * @brief Get data from user, check if data was set and create data structure to send to server
 */
 function getConfigDataToUpdate(){
	var JSONtext='';
	
	var ip=document.getElementById("IP_Adress").value;
	
	if(ip!=""){JSONtext=JSONtext+"ip="+ip;}
	
	var port=document.getElementById("Port").value;
	if(port!=""){JSONtext=JSONtext+"&&port="+port;}
	
	var sampleTime=document.getElementById("SampleTime").value;
	if( sampleTime!=""){JSONtext=JSONtext+"&&sampleTime="+sampleTime;}
	
	var sampleQuantity=document.getElementById("SampleQuantity").value;
	if( sampleQuantity!=""){JSONtext=JSONtext+"&&sampleQuantity="+sampleQuantity;}
	
	var api=document.getElementById("configAPI").value;
	if( api!=""){JSONtext=JSONtext+"&&api="+api;}
	
	console.log(JSONtext);
	return JSONtext

}


/**
 * @brief Gets string from getConfigDataToUpdate function and sends it to server
 */
 function updateConfig(){
	//Format for POST method: ip=...&&port=...&&sampleTime=...&&sampleQuantity=...
	var JSONtext=getConfigDataToUpdate();
	console.log("Updating Config...");
	
	$.ajax(saveConfigScript, {
			type: "POST",
			data: JSONtext,
			dataType: "text",
			crossDomain: true,
			
			beforeSend: function(x) {
				console.log("AJAX POST REQUEST: initialization");
			},
			success: function(result) {
				console.log("AJAX POST REQUEST SUCCESFULL: " + result);
			},
			error: function(XMLHttpRequest, textStatus, errorThrown) {
				console.log("AJAX POST REQUEST: FAILURE");
				console.log("STATUS: " + textStatus);
				console.log("ERROR: " + errorThrown);
			},
			cache: false
			
	});
	

}







	
