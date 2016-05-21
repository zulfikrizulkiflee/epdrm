<?php
include('dbconn.php');

$sql="SELECT * FROM mers_callcard";
$result=mysqli_query($con,$sql);
$return_arr = array();

// Associative array
while( $row = mysqli_fetch_assoc( $result ) ){
    $row_array['incidentlat'] = $row['incidentlat'];
    $row_array['incidentlng'] = $row['incidentlng'];
    $row_array['callcardid'] = $row['callcardid'];
    $row_array['incidentdetails'] = $row['incidentdetails'];
    $row_array['receiveddatetime'] = $row['receiveddatetime'];
    
    array_push($return_arr,$row_array);
}
echo json_encode($return_arr);

// Free result set
mysqli_free_result($result);

mysqli_close($con);
?>