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

//$sql="SELECT * FROM mers_callcard a JOIN mers_status b ON a.callcardid = b.callcardid JOIN mers_lkp_status c ON b.statusid = c.statusid ORDER BY b.logdatetime DESC";
$ccid=$_POST['callcardid'];

$sql="SELECT a.id, a.callcardid, a.incidentdetails, a.assignedtouserid, a.assignedtodatetime, a.incidentlat, a.incidentlng,
(SELECT b.statusid FROM  mers_status b where b.callcardid = a.callcardid ORDER BY b. logdatetime DESC LIMIT 1) as statusid,
(SELECT d.fullname FROM  mers_user d where d.userid = a.assignedtouserid ORDER BY a.receiveddatetime DESC LIMIT 1) as fullname,
(SELECT c.statusdesc FROM  mers_status b , mers_lkp_status c where b.callcardid = a.callcardid
AND c.statusid = b.statusid ORDER BY b. logdatetime DESC LIMIT 1) as statusdesc,
(SELECT b.logdatetime FROM  mers_status b , mers_lkp_status c where b.callcardid = a.callcardid
AND c.statusid = b.statusid ORDER BY b. logdatetime DESC LIMIT 1) as statusstarttime
FROM mers_callcard a WHERE callcardid = $ccid";
$result=mysqli_query($con,$sql);

// Associative array
while( $row = mysqli_fetch_assoc( $result ) ){
    $color="";
    $fontcolor="";
    
    $duration = "00:00:00";
    $statusstarttime = $row['statusstarttime'];
    //cari beza
    $mySQL3 = "SELECT TIMEDIFF(now(), '" . $statusstarttime . "') AS duration FROM DUAL";
        $result3 = mysqli_query($con, $mySQL3);
        if ($row3 = mysqli_fetch_array($result3))
        {
                //ada duration
                $duration = $row3['duration'];
        }
    
    if ($row['statusdesc'] == "Dispatched"){
        $color = "yellow";
        $fontcolor="black";
    }
    else if ($row['statusdesc'] == "Enroute"){
        $color = "blue";
        $fontcolor="white";
    }
    else if ($row['statusdesc'] == "At Scene"){
        $color = "red";
        $fontcolor="white";
    }
    else if ($row['statusdesc'] == "Finished")
        $color = "green";
    else if ($row['statusdesc'] == "Complete"){
        $color = "teal";
        $fontcolor="white";
    }
    else if ($row['statusdesc'] == "Rollback"){
        $color = "white";
        $fontcolor="black";
    }
    
    //echo "abc";
    
    echo "<tr><td class='id' style='text-align:center'>{$row['callcardid']}</td><td style='text-align:center'>{$row['fullname']}</td><td id='stats' style='background-color:$color;text-align:center;color:$fontcolor;font-weight:bold'>{$row['statusdesc']}</td><td>
    
    <center><button title='History' class='uk-button uk-icon-history' data-uk-modal={target:'#CCstatus-modal'} onclick='changeStatus({$row['callcardid']});'></button><center>
    
    </td>
    
    <td><center><span id='timer1'>".$duration."</span></center></td>
    
</tr>";
}

// Free result set
//mysqli_free_result($result);

mysqli_close($con);
?>