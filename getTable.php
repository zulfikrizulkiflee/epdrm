<?php
session_start();
include('dbconn.php');

//$sql="SELECT * FROM mers_callcard a JOIN mers_status b ON a.callcardid = b.callcardid JOIN mers_lkp_status c ON b.statusid = c.statusid ORDER BY b.logdatetime DESC";
$stationid=1;

$sql="SELECT a.id, a.callcardid, a.incidentdetails, a.assignedtouserid, a.assignedtodatetime, a.incidentlat, a.incidentlng,
(SELECT b.statusid FROM  mers_status b where b.callcardid = a.callcardid ORDER BY b. logdatetime DESC LIMIT 1) as statusid,
(SELECT d.fullname FROM  mers_user d where d.userid = a.assignedtouserid ORDER BY a.receiveddatetime DESC LIMIT 1) as fullname,
(SELECT c.statusdesc FROM  mers_status b , mers_lkp_status c where b.callcardid = a.callcardid 
AND c.statusid = b.statusid ORDER BY b. logdatetime DESC LIMIT 1) as statusdesc
FROM mers_callcard a WHERE a.stationid=$stationid ORDER BY a.receiveddatetime DESC";
$result=mysqli_query($con,$sql);

// Associative array
while( $row = mysqli_fetch_assoc( $result ) ){
    $color="";
    $fontcolor="";
    
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
    else if ($row['statusdesc'] == "Finished"){
        $color = "green";
        $fontcolor="white";
    }
    else if ($row['statusdesc'] == "Complete"){
        $color = "teal";
        $fontcolor="white";
    }
    else if ($row['statusdesc'] == "Rollback"){
        $color = "white";
        $fontcolor="black";
    }
    
    echo "<tr><td class='id'>{$row['callcardid']}</td><td>{$row['incidentdetails']}</td><td>{$row['fullname']}</td><td>{$row['assignedtodatetime']}</td><td  style='background-color:$color;text-align:center;color:$fontcolor;font-weight:bold'>{$row['statusdesc']}</td><td width='100px'>
    
    <button style='display:inline-block' title='Show' onclick=showCC(". $row['callcardid'] .",". $row['incidentlat'] .",". $row['incidentlng'] .") class='uk-button-mini uk-button-primary uk-icon-eye' name='rowButton". $row['callcardid'] ."'></button>
    
    <button style='display:inline-block' title='Assign' class='uk-button-mini uk-button-success uk-icon-check-square-o' onclick=assigntrigger(". $row['callcardid'] .") data-uk-modal={target:'#assign-resources-container'} name='rowButton". $row['callcardid'] ."'></button>
    
    <button style='display:inline-block' title='Delete' onclick=deleteCC(". $row['callcardid'] .") class='uk-button-mini uk-button-danger uk-icon-remove' name='rowButton". $row['callcardid'] ."'></button>
    
    </td></tr>";
}

//button click function
echo "<script>\n";
echo "$('td button').click(function(){\n";
echo "var tr = $(this).closest('tr');\n";
echo "var id = tr.find('.id').text();\n";
//echo "alert(id);\n";
echo "});\n";
echo "var arr = [];\n";
echo "for (var i = 0; i < $('tr td:nth-child(5)').length; i++) {\n";
echo "    if ($('tr:nth-child(' + i + ') td:nth-child(5)').text() == \"\") {\n";
echo "        arr.push($(this));\n";
echo "    }\n";
echo "}\n";
echo "$('#bdg').append(arr.length - 1);";
echo "</script>";

// Free result set
//mysqli_free_result($result);

mysqli_close($con);
?>