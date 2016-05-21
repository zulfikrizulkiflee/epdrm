<?php
session_start();
include('dbconn.php');

//$sql="SELECT * FROM mers_callcard a JOIN mers_status b ON a.callcardid = b.callcardid JOIN mers_lkp_status c ON b.statusid = c.statusid ORDER BY b.logdatetime DESC";

$stationid=1;

$new="SELECT COUNT(id) AS newCC FROM mers_callcard WHERE assignedtouserid IS null AND stationid=$stationid";
$assigned="SELECT COUNT(id) AS assignedCC FROM mers_callcard WHERE assignedtouserid IS NOT null AND stationid=$stationid";
$unrespond="SELECT COUNT(a.callcardid) AS unrespondCC FROM mers_callcard a WHERE a.callcardid NOT IN (SELECT distinct b.callcardid FROM mers_status b) AND (a.assignedtouserid IS NULL OR a.assignedtouserid = '') AND stationid=$stationid";
$newCC=mysqli_query($con,$new);
$assignedCC=mysqli_query($con,$assigned);
$unrespondCC=mysqli_query($con,$unrespond);

// Associative array
$row1 = mysqli_fetch_assoc( $newCC );
$row2 = mysqli_fetch_assoc( $assignedCC );
$row3 = mysqli_fetch_assoc( $unrespondCC );

echo "New CallCard: {$row1['newCC']}<br>Assigned Callcard: {$row2['assignedCC']}<br>Unresponded Callcard: {$row3['unrespondCC']}";


// Free result set
//mysqli_free_result($result);

mysqli_close($con);
?>