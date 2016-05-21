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

$duration = "-1";



$mySQL = "SELECT A.id as id, A.statusid as statusid, A.statusdesc AS statusdesc 
    FROM epdrm_usr.mers_lkp_status A ORDER BY A.id";
$result0 = mysqli_query($conn, $mySQL);
while ($row0 = mysqli_fetch_array($result0))
{
    
    $statusidX = $row0["statusid"];
    $statusdescX = $row0["statusdesc"];
    
    $mySQL = "SELECT A.id as id, A.statusid as statusid, 
    (SELECT B.statusdesc FROM epdrm_usr.mers_lkp_status B WHERE B.statusid = A.statusid) AS statusdesc, 
    DATE_FORMAT(A.logdatetime, '%d/%m/%Y %H:%i %p') AS logdatetime,
    A.logdatetime AS logdatetimeNOW  
    FROM epdrm_usr.mers_status A WHERE A.callcardid = '" . $callcardid . "' AND A.statusid = '" . $statusidX . "'
    AND A.logdatetime IS NOT NULL 
    ORDER BY A.logdatetime";

    // 
    
    //echo $mySQL;


    $rowx = array();
    $result = mysqli_query($conn, $mySQL);
    $adastatus = 0;
    
    while ($row = mysqli_fetch_array($result))
        {
            //$rowx[] = $row;
            $adastatus = $adastatus +1;
            $idnow = $row['id'];
            $logdatetimeNOW = $row['logdatetimeNOW'];

            //dapatkan 1 rekod SELEPAS rekod ini
            $mySQL2 = "SELECT A.id as id, A.statusid as statusid, 
                (SELECT B.statusdesc FROM epdrm_usr.mers_lkp_status B WHERE B.statusid = A.statusid) AS statusdesc, 
                DATE_FORMAT(A.logdatetime, '%d/%m/%Y %H:%i %p') AS logdatetime,
                A.logdatetime AS logdatetimeNOW
                FROM epdrm_usr.mers_status A WHERE A.callcardid = '" . $callcardid . "' AND A.logdatetime IS NOT NULL 
                and A.id <> '" . $idnow . "' AND A.logdatetime > '" . $logdatetimeNOW ."' AND A.statusid <> '0'
                ORDER BY A.logdatetime";
            //echo $mySQL2;

            $result2 = mysqli_query($conn, $mySQL2);
            if ($row2 = mysqli_fetch_array($result2))
            {
                //ada rekod.. check perbezaan masa.

                $mySQL3 = "SELECT TIMEDIFF('" . $row2['logdatetimeNOW']. "','" . $logdatetimeNOW ."') AS duration 
                            FROM DUAL";
                //echo "========" . $mySQL3;
                        $result3 = mysqli_query($conn, $mySQL3);
                        if ($row3 = mysqli_fetch_array($result3))
                        {
                            //ada duration
                            $duration = $row3['duration'];
                        }

            }
            else 
            {
                $duration = "-1";
            }


            //buat FINAL SQL dan masukkan dalam rowx[]
            $mySQL4 = "SELECT A.id as id, A.statusid as statusid, 
                (SELECT B.statusdesc FROM epdrm_usr.mers_lkp_status B WHERE B.statusid = A.statusid) AS statusdesc, 
                DATE_FORMAT(A.logdatetime, '%d/%m/%Y %H:%i %p') AS logdatetime,
                A.logdatetime AS logdatetimeNOW, '" . $duration . "' AS duration   
                FROM epdrm_usr.mers_status A WHERE A.callcardid = '" . $callcardid . "' AND A.logdatetime IS NOT NULL 
                AND A.id = '" . $idnow . "'
                ORDER BY A.logdatetime";
            //echo $mySQL;	

                //$rowx4 = array();
                $result4 = mysqli_query($conn, $mySQL4);
                if ($row4 = mysqli_fetch_array($result4))
                        $color="";
                        $fontcolor="";

                        if ($row4['statusdesc'] == "Dispatched"){
                            $color = "yellow";
                            $fontcolor="black";
                        }
                        else if ($row4['statusdesc'] == "Enroute"){
                            $color = "blue";
                            $fontcolor="white";
                        }
                        else if ($row4['statusdesc'] == "At Scene"){
                            $color = "red";
                            $fontcolor="white";
                        }
                        else if ($row4['statusdesc'] == "Finished"){
                            $color = "green";
                            $fontcolor="white";
                        }
                        else if ($row4['statusdesc'] == "Complete"){
                            $color = "teal";
                            $fontcolor="white";
                        }
                        else if ($row4['statusdesc'] == "Rollback"){
                            $color = "white";
                            $fontcolor="black";
                        }
                        
                    {
                        //$rowx[] = $row4;
                        $timer="[" . $row4['duration'] . "]";
                        if ($row4['duration'] == '-1'){
                            $timer = "";
                        }
                        
                            echo "<button onclick=updateStatus({$row4['statusid']},{$callcardid}) style='width:100px;background-color:$color;font-color:$fontcolor'>{$row4['statusdesc']}</button>&nbsp&nbsp{$row4['logdatetime']}&nbsp&nbsp;{$timer}<br>";
                      
                        //echo "{$row4['statusdesc']}&nbsp&nbsp{$row4['logdatetime']},{$row4['duration']}<br>";

                    }




        }    
    
        if ($adastatus == 0)
        {
                        $color="";
                        $fontcolor="";

                        if ($statusdescX == "Dispatched"){
                            $color = "yellow";
                            $fontcolor="black";
                        }
                        else if ($statusdescX == "Enroute"){
                            $color = "blue";
                            $fontcolor="white";
                        }
                        else if ($statusdescX == "At Scene"){
                            $color = "red";
                            $fontcolor="white";
                        }
                        else if ($statusdescX == "Finished"){
                            $color = "green";
                            $fontcolor="white";
                        }
                        else if ($statusdescX == "Complete"){
                            $color = "teal";
                            $fontcolor="white";
                        }
                        else if ($statusdescX == "Rollback"){
                            $color = "white";
                            $fontcolor="black";
                        }
            $duration = "-1";
            echo "<button onclick=updateStatus({$statusidX},{$callcardid}) style='width:100px;background-color:$color;color:$fontcolor'>{$statusdescX}</button><br>";
        }
    
    
}





// Free result set
mysqli_free_result($result);

mysqli_close($conn);

?>