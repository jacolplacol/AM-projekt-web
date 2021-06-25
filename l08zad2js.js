var jsonLedMatrix;
function start(){
var id;
var ledMatrix= [];
for(id=1; id < 65; id++)
{
	var rgbMatrix = [];
	var newid = "#" +id;
	var color = $(newid).val();
	
	var redHex = color.substring(1, 3);
	var greenHex = color.substring(3, 5);
	var blueHex = color.substring(5, 7);
	
	var redDec = parseInt(redHex, 16);
	var greenDec = parseInt(greenHex, 16);
	var blueDec = parseInt(blueHex, 16);
	
	rgbMatrix.push(redDec);
	rgbMatrix.push(greenDec);
	rgbMatrix.push(blueDec);
	ledMatrix.push(rgbMatrix);
}
jsonLedMatrix = JSON.stringify(ledMatrix);
$("#serverResponse").text(jsonLedMatrix);

	var array = jsonLedMatrix;
	$.ajax({  
    type: 'GET',
    url: 'l08zad2php.php', 
    data: {myarray: array },
    success: function(data) {
         alert("Dane zostały wysłane na serwer"); 
    }
});
	
};



$(document).ready(() => { 
	$("#sendDataBtn").click(start);
});