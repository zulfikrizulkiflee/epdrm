<?php
session_start();
include('dbconn.php');

$callcardid = $_POST['callcardid'];

//$sql="SELECT * FROM mers_callcard a JOIN mers_status b ON a.callcardid = b.callcardid JOIN mers_lkp_status c ON b.statusid = c.statusid ORDER BY b.logdatetime DESC";
$sql="DELETE FROM mers_callcard WHERE callcardid = $callcardid";
$result=mysqli_query($con,$sql);

// Free result set
//mysqli_free_result($result);

mysqli_close($con);
?>