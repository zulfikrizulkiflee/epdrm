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

$mystring =  "";

$sql="SELECT a.userid AS userid,a.urlprofilepic AS urlprofilepic,a.fullname AS fullname FROM mers_user a ORDER BY a.userid";
$result=mysqli_query($con,$sql);

$r1 = 0;
$r2 = 0;
$r3 = 0;

foreach ($con->query($sql) as $row){//Array or records stored in $row
// while ($row = mysqli_fetch_array($result)) {
     
     $r1 = $r1 + 1;
    
    $userid_X = $row['userid'];
    $urlprofilepic_X = $row['urlprofilepic'];
    $fullname_X =  $row['fullname'];
    
    $sql2="SELECT a.callcardid AS callcardid FROM mers_callcard a WHERE a.assignedtouserid = '" . $row['userid']. "' ORDER BY a.assignedtodatetime DESC LIMIT 1";
    $result2=mysqli_query($con,$sql2);
     
    foreach ($con->query($sql2) as $row2){
    // while ($row2 = mysqli_fetch_array($result2)) {
            
              $r2 = $r2 + 1;
            
             
             $sql3="SELECT A.statusid, B.statusdesc AS statusdesc FROM mers_status A, mers_lkp_status B WHERE A.callcardid = '" . $row2['callcardid']. "' 
             AND A.statusid = B.statusid ORDER BY A.logdatetime DESC LIMIT 1";
             $result3=mysqli_query($con,$sql3);
        
             foreach ($con->query($sql3) as $row3){
            //if ($row3 = mysqli_fetch_array($result3)) {
                     $r3 = $r3 + 1;
                     $mystring = $mystring . "<button class='uk-button uk-button-large uk-icon-car uk-text-bold' style='height:80px;margin:5px;width:17vw;max-width:17vw' type='button' onclick=getlocation({$userid_X},'{$row2['callcardid']}')><span style='font-family: 'Raleway, sans-serif;'> {$fullname_X}<br>Now Attend: ". $row2['callcardid'] . "<br>Current Status: " . $row3['statusdesc'] ."</span></button>";
                 
                // echo "HASNOLLL";
                        /* Option values are added by looping through the array */ 
             }
            if ($r3 == 0)
            {
                $mystring = $mystring . "<button class='uk-button uk-button-large uk-icon-car uk-text-bold' style='height:80px;margin:5px;width:17vw;max-width:17vw' type='button' onclick=getlocation({$userid_X},'{$row2['callcardid']}')><span style='font-family: 'Raleway, sans-serif;'> {$fullname_X}</span></button>";
            }
         
    }
     if ($r2 == 0)
            {
                $mystring = $mystring . "<button class='uk-button uk-button-large uk-icon-car uk-text-bold' style='height:80px;margin:5px;width:17vw;max-width:17vw' type='button' onclick=getlocation({$userid_X},'')><span style='font-family: 'Raleway, sans-serif;'> {$fullname_X}</span></button>";
         
            }
    
   
}

if ($r1 == 0)
            {
                $mystring = $mystring . "<button class='uk-button uk-button-large uk-icon-car uk-text-bold' style='height:80px;margin:5px;width:17vw;max-width:17vw' type='button' onclick=getlocation({$userid_X},'')><span style='font-family: 'Raleway, sans-serif;'> {$row[fullname]}</span></button>";
            }


echo $mystring;


// Free result set
mysqli_free_result($result);

mysqli_close($con);

/*foreach ($con->query($sql3) as $row3){
            //if ($row3 = mysqli_fetch_array($result3)) {
                     $r3 = $r3 + 1;
                     $mystring = $mystring . "<li><a href='#!' value='{$userid_X}' onclick=getlocation({$userid_X},'{$row2['callcardid']}');><img src='{$urlprofilepic_X}'  style='height:50px;width:50px;border-radius:50%'>{$fullname_X}</a><br>" . $row2['callcardid'] . " - " . $row3['statusdesc'] . "</li>";
                 
                // echo "HASNOLLL";
                        /* Option values are added by looping through the array */ 
            /* }
            if ($r3 == 0)
            {
                $mystring = $mystring . "<li><a href='#!' value='{$userid_X}' onclick=getlocation({$userid_X},'{$row2['callcardid']}');><img src='{$urlprofilepic_X}'  style='height:50px;width:50px;border-radius:50%'>{$fullname_X}</a></li>";
            }
         
    }
     if ($r2 == 0)
            {
                $mystring = $mystring . "<li><a href='#!' value='{$userid_X}' onclick=getlocation({$userid_X},'');><img src='{$urlprofilepic_X}'  style='height:50px;width:50px;border-radius:50%'>{$fullname_X}</a></li>";
         
            }
    
   
}

if ($r1 == 0)
            {
                $mystring = $mystring . "<li><a href='#!' value='{$userid_X}' onclick=getlocation({$userid_X},'');><img src='{$urlprofilepic_X}'  style='height:50px;width:50px;border-radius:50%'>{$row[fullname]}</a></li>";
            }*/

?>