var optionsMatrix = [];
function start(){
	var IP =$(ip).val();
	var PORT =$(port).val();
	var API =$(api).val();
	var Ts =$(ts).val();
	var Samples =$(sample).val();
	optionsMatrix.push (IP);
	optionsMatrix.push(PORT);
	optionsMatrix.push(API);
	optionsMatrix.push(Ts);
	optionsMatrix.push(Samples);
	var jsonOptionsMatrix = JSON.stringify(optionsMatrix);
optionsMatrix =[];

$.ajax({  
    type: 'GET',
    url: 'l08zad3.php', 
    data: {myarray: jsonOptionsMatrix},
    success: function(data) {
         alert("Dane zostały wysłane na serwer"); 
    }
});
};

$(document).ready(() => { 
    $.get("odbierz.php").done(function(data){
    var odebrane = JSON.parse(data);
	$('#ip').val(odebrane[0].toString());
	$('#port').val(odebrane[1].toString());
	$('#api').val(odebrane[2].toString());
	$('#ts').val(odebrane[3].toString());
	$('#sample').val(odebrane[4].toString());
});
	$("#save_button").click(start);
});
	
