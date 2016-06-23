<?php
session_start();
$servername = "awsdb2.cckqbw2vjnxm.ap-southeast-1.rds.amazonaws.com";
$username = "awsdb";
$password = "awsdb_2015";
$dbname = "epdrm_usr";

$con=mysqli_connect("$servername","$username","$password","$dbname");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

$callcardid = $_REQUEST['callcardid'];

$sql="SELECT ";
$result=mysqli_query($con,$sql);

// Free result set
//mysqli_free_result($result);

mysqli_close($con);
?>