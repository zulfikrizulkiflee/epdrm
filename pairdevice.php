<?php
include('dbconn.php');

$sql="SELECT * FROM mers_user ORDER BY userid";
$result=mysqli_query($con,$sql);
    
echo "<form class='uk-form'><select id=mpvuserid>"; // list box select command

foreach ($con->query($sql) as $row){//Array or records stored in $row

echo "<option value=$row[userid]>$row[fullname]</option>";
/* Option values are added by looping through the array */ 
}
echo "</select>";// Closing of list box
//echo "<input type='submit' value=' SubmitX ' name='submit' id='submit' /></form>";

// Free result set
mysqli_free_result($result);

mysqli_close($con);
?>
    <script>
        $('#mpvuserid').change(function () {
            $('#qrcode').html("");
        });

        function setmpv() {
            var mpvuserid = $('#mpvuserid').val();
            //alert(mpvuserid);

            var TX = Math.random();
            $.ajax({
                type: "POST",
                url: "http://52.76.166.8/epdrm/api_generator.php?api_name=M_GENERATEQRCODE&TX=" + TX,
                data: {
                    userid: mpvuserid
                },
                cache: false,
                timeout: 15 * 1000,
                error: function (xhr, textStatus, errorThrown) {
                    return false;
                },
                success: function (response) {
                    var jsonObj = JSON.parse(response);
                    if (jsonObj.length > 0) {
                        var statusz = "" + jsonObj[0].STATUS;
                        if (statusz == "1") {
                            var generatedKey = "" + jsonObj[0].GENERATEDKEY;
                            $('#qrcode').html("");
                            $('#qrcode').append('<center><img src="http://api.qrserver.com/v1/create-qr-code/?color=000000&amp;bgcolor=FFFFFF&amp;data=' + generatedKey + '&amp;qzone=1&amp;margin=0&amp;size=200x200&amp;ecc=L" alt="qr code" /></center>');
                        }

                    }
                }
            });
        };

        var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');

        //firebase detect changes
        tableFirebaseRef.child("qrdetected").on("child_changed", function (snapshot) {
            $('#qrcode').html("");
            var modal = UIkit.modal("#pair-device-container");
            if (modal.isActive()) {
                modal.hide();
            } else {
                modal.show();
            }
        });
    </script>