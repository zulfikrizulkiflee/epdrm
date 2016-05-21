<?php
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
?>