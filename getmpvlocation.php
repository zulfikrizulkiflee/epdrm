<?php
include('dbconn.php');

$sql="SELECT userid,lat,lng,fullname,stationid FROM mers_user";

$result=mysqli_query($con,$sql);
$return_arr = array();

// Associative array
while( $row = mysqli_fetch_assoc( $result ) ){
    $row_array['userid'] = $row['userid'];
    $row_array['lat'] = $row['lat'];
    $row_array['lng'] = $row['lng'];
    $row_array['fullname'] = $row['fullname'];
    $row_array['stationid'] = $row['stationid'];
    
    array_push($return_arr,$row_array);
}
echo json_encode($return_arr);

// Free result set
mysqli_free_result($result);

mysqli_close($con);
?>