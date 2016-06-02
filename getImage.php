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
    
    $callcardid = $_POST['callcardid'];
    $sql="SELECT callcardid,filename,DATE_FORMAT(createddatetime,'%m-%d-%Y') AS createddate,DATE_FORMAT(createddatetime,'%h:%i_%p') AS createdtime,(SELECT UPPER(b.username) FROM mers_user b,mers_callcard c WHERE c.callcardid = '$callcardid' AND c.assignedtouserid = b.userid) AS photofrom FROM mers_photo_unlimited WHERE callcardid = '$callcardid' ORDER BY createddatetime";
    
    $result=mysqli_query($con,$sql);

    $mystr="";

    foreach ($con->query($sql) as $row){
        $urlimg = "http://52.76.166.8/epdrm/upload/{$row['filename']}";
        $crdate = $row['createddate'];
        $crtime = $row['createdtime'];
        $photofrom = $row['photofrom'];
        
        $mystr =  $mystr."<a href='#' onclick=imageLightbox('". $urlimg ."') data-uk-modal={target:'#image-upsize',center:true}><img src='http://52.76.166.8/epdrm/upload/{$row['filename']}' style='height:10vh;width:100px;margin-right:5px;border-width:3px;border-color:white;border-style:solid'></a>";
        
        //echo $urlimg;
        
    }
echo $mystr;
?>