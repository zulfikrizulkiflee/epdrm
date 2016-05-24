<?php
session_start();
include('dbconn.php');

$callcardid = $_POST['callcardid'];

$sql="SELECT * FROM mers_user WHERE stationid = 1 ORDER BY userid";
$result=mysqli_query($con,$sql);
    
echo "<form>"; // list box select command

foreach ($con->query($sql) as $row){//Array or records stored in $row

echo "<a href='#' onclick='assignmpv($row[userid]);'><img src='$row[urlprofilepic]' id='user' value='$row[userid]' style='margin-left:20px;height:50px;width:50px;border-radius:5px'>$row[fullname]</a>";
/* Option values are added by looping through the array */ 
}

//echo "<input type='submit' value=' SubmitX ' name='submit' id='submit' /></form>";
    //echo "<input type='hidden' value='" . $_SESSION["callcardid"] . "' id='callcardid' /> </form>";

if(isset($_POST["submit"])){
    $time = date("Y-m-d h:i:sa");
    //$sql = "UPDATE mers_callcard SET assignedtouserid = '".$_POST["fullname"]."',assignedtodatetime = now() where callcardid = '".$_REQUEST["callcardid"]."'";
    //echo $sql;
   // if ($conn->query($sql) === TRUE) {
        
       // 
     // echo "<script type= 'text/javascript'>alert('Assigned successfully');</script>";
    //} else {
    //    echo "<script type= 'text/javascript'>alert('Error: " . $sql . "<br>" . $conn->error."');</script>";

   // }
    //echo "kjhsjhdajshdjs";
}

// Free result set
mysqli_free_result($result);

mysqli_close($con);
?>

    <script>
        //function assignmpv(username) {
        //alert(username);

        //};

        function assignmpv(username) {
            var userid = username;
            var callcardidx = $("#callcardid").val();
            //alert(userid);
            //lert(callcardidx);

            if (confirm("Assign Callcard " + callcardidx + " to " + userid + "?") == true) {
                var TX = Math.random();
                $.ajax({
                    type: "POST",
                    url: "http://52.76.166.8/epdrm/api_generator.php?api_name=M_ASSIGNED_MPV&TX=" + TX,
                    data: {
                        callcardid: callcardidx,
                        userid: userid
                    },
                    cache: false,
                    timeout: 15 * 1000,
                    error: function (xhr, textStatus, errorThrown) {
                        return false;
                    },
                    success: function (response) {

                        callSiren(userid);
                        var firebaseTable = new Firebase('https://epdrmtable.firebaseio.com/');

                        firebaseTable.update({
                            newrowinserted: {
                                indicate: TX
                            }
                        });
                    }
                });
                var modal = UIkit.modal("#assign-resources-container");
                if (modal.isActive()) {
                    modal.hide();
                } else {
                    modal.show();
                }
            } else {

            }
        }


        function callSiren(userid) {
            //var userid = $("#userid").val();
            var callcardidx = $("#callcardid").val();

            var TX = Math.random();
            $.ajax({
                type: "POST",
                url: "http://52.76.166.8/epdrm/api_generator.php?api_name=M_SEND_GCM_NOTIFICATION&TX=" + TX,
                data: {
                    title: "You have new callcard [" + callcardidx + "]",
                    message: "You have new callcard [" + callcardidx + "]",
                    userid: userid
                },
                cache: false,
                timeout: 15 * 1000,
                error: function (xhr, textStatus, errorThrown) {
                    return false;
                },
                success: function (response) {}
            });

        }
    </script>