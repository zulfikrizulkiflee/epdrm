<?php
$servername = "awsdb2.cckqbw2vjnxm.ap-southeast-1.rds.amazonaws.com";
$username = "awsdb";
$password = "awsdb_2015";
$dbname = "epdrm_usr";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}


$id = mt_rand(100000,999999);
$time = date("Y-m-d h:i:sa");
$name = $_POST["name"];
$phone = $_POST["phone"];
$callerloc = $_POST["callerloc"];
$city = $_POST["city"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];
$detail = $_POST["detail"];
$stationid = 1;

    
$sql = "INSERT INTO mers_callcard (callcardid,receiveddatetime, callername, callerphoneno, callerlocation,incidentaddress, incidentlat, incidentlng, incidentdetails,stationid,notification)
VALUES ('$id','$time','$name','$phone','$callerloc','$city','$lat','$lng','$detail','$stationid','Y')";

if ($conn->query($sql) === TRUE) {
echo "<script type= 'text/javascript'>alert('New record created successfully');
</script>";

} else {
echo "<script type= 'text/javascript'>alert('Error: " . $sql . "<br>" . $conn->error."');</script>";
}

$conn->close();

?>


    <!--echo "<script>\n";
echo "            var firebaseTable = new Firebase('https://epdrmtable.firebaseio.com/');\n";
echo "var i=Math.random();\n";
echo "            firebaseTable.update({\n";
echo "                newrowinserted:{indicate: i}\n";
echo "            });\n";
echo "        </script>";-->