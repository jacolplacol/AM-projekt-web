<?php 
$array = $_GET['myarray'];

file_put_contents("l08zda2json.json", $array);
print  $array;
   ?>