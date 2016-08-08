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


$userid = $_POST["id"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];

    
$sql = "UPDATE mers_user SET lat=$lat,lng=$lng,logdatetime=now() WHERE userid=$userid";

if ($conn->query($sql) === TRUE) {
echo "<script type= 'text/javascript'>console.log('refresh mpv loc');
</script>";

} else {
echo "<script type= 'text/javascript'>alert('Error: " . $sql . "<br>" . $conn->error."');</script>";
}

$conn->close();

?>