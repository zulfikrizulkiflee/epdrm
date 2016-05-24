<?php
session_start();
$servername = "awsdb2.cckqbw2vjnxm.ap-southeast-1.rds.amazonaws.com";
$username = "awsdb";
$password = "awsdb_2015";
$dbname = "epdrm_usr";

$conn=mysqli_connect("$servername","$username","$password","$dbname");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }

//$sql="SELECT * FROM mers_callcard a JOIN mers_status b ON a.callcardid = b.callcardid JOIN mers_lkp_status c ON b.statusid = c.statusid ORDER BY b.logdatetime DESC";
//$ccid=$_POST['callcardid'];

$callcardid = $_REQUEST['callcardid'];
$statusid = $_REQUEST['statusid'];

//$duration = "-1";



//check dulu..
$mySQL = "SELECT id FROM epdrm_usr.mers_status WHERE callcardid = '" . $callcardid . "' 
	AND statusid = '" . $statusid . "'";

//echo $mySQL;

$resulty = mysqli_query($conn, $mySQL);
if ($rowy = mysqli_fetch_array($resulty))
{
	//do nothing
	//echo "DO NOTHING";
}
else
{
	//insert
    $mySQL = "INSERT INTO epdrm_usr.mers_status (callcardid, statusid, logdatetime) 
		VALUES ('" . $callcardid . "','" . $statusid . "', now())";

	//echo $mySQL;
    $result = mysqli_query($conn, $mySQL);
}







// Free result set
mysqli_free_result($result);

mysqli_close($conn);

?>