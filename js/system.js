$('document').ready(function () {
    $('#qrspin').hide();
    $('#notification').hide();
    $('#CCstatus').hide();
    $('#min-container').hide();
    callcardreport();

});



$(function () {
    $(".draggable").draggable({
        containment: "#map"
    });
    $(".resizable").resizable();
});

/*var report = "";
$.ajax({
    type: "POST",
    url: "http://52.76.166.8/epdrm/mapscreenv2/reportTable.php",
    success: function (response) {
        $('.callcard-info').html(response);
    }
});*/

function printCCTable() {
    $.ajax({
        type: "POST",
        url: "http://52.76.166.8/epdrm/mapscreenv2/getTable.php",
        success: function (response) {
            $('#CCtable tbody').html(response);
        }
    });
}

function mpvlist() {
    $.ajax({
        type: "POST",
        url: "http://52.76.166.8/epdrm/mapscreenv2/mpvlocatorajax.php",
        success: function (response) {
            $('.mpv').html(response);
        }
    });
}

function callcardreport() {
    var report = "";
    $.ajax({
        type: "POST",
        url: "http://52.76.166.8/epdrm/mapscreenv2/reportTable.php", //here goes your php script file where you want to pass value
        success: function (response) {
            $('.callcard-info').html(response);
        }
    });
}

function loadCC() {
    $.ajax({
        type: "POST",
        url: "http://52.76.166.8/epdrm/mapscreenv2/getTable.php",
        success: function (response) {
            $('#CCtable tbody').html(response);
        }
    });
}

function deleteCC(callcardid) {
    var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
    UIkit.modal.confirm("<span style='font-size:18px'>Delete CallCard with ID: " + callcardid + "</span>", function () {
        $.ajax({
            type: "POST",
            url: "http://52.76.166.8/epdrm/mapscreenv2/deleteCC.php",
            data: {
                "callcardid": callcardid
            },
            success: function (response) {
                var TX = Math.random();

                tableFirebaseRef.update({
                    rowclosed: {
                        indicate: TX
                    }
                });
                $('#CCtable tbody').html("");
                callcardreport();
                loadCC();
            }
        });
    });
}



function submitnew() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var callerloc = $('#callerloc').val();
    var city = $('#city').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var detail = $('#detail').val();
    var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');

    $.ajax({
        type: 'POST',
        url: 'http://52.76.166.8/epdrm/mapscreenv2/newcallcard.php',
        data: {
            name: name,
            phone: phone,
            callerloc: callerloc,
            city: city,
            lat: lat,
            lng: lng,
            detail: detail
        },
        success: function (response) {
            var TX = Math.random();

            tableFirebaseRef.update({
                newrowinserted: {
                    indicate: TX
                }
            });
            var noticallcard = new Audio('audio/notificationcallcard.mp3');
            noticallcard.play();
            $('#notification').html("New CallCard Received");
            $('#notification').show().delay(5000).fadeOut();
            var name = $('#name').val("");
            var phone = $('#phone').val("");
            var callerloc = $('#callerloc').val("");
            var city = $('#city').val("");
            //var lat = $('#lat').val("");
            //var lng = $('#lng').val("");
            var detail = $('#detail').val("");
            var modal = UIkit.modal("#newCC");
            if (modal.isActive()) {
                modal.hide();
            } else {
                modal.show();
            }

        }
    });

    return false;
}



function cancelnew() {
    var name = $('#name').val("");
    var phone = $('#phone').val("");
    var city = $('#city').val("");
    var detail = $('#detail').val("");
    var modal = UIkit.modal("#newCC");
    if (modal.isActive()) {
        modal.hide();
    } else {
        modal.show();
    }
}

var callcardidsemasa = '';
var globalgambaralert = 0;

function openImg(callcardid) {
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getImage.php',
        data: {
            'callcardid': callcardid
        },
        success: function (response) {
            //console.log(response);
            callcardidsemasa = callcardid;
            if (response !== "") {
                $('.CC-image').html(response);
                $('.CC-image').show();
            }
            //$('.image-container').show();
        }
    });
}

/*var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
tableFirebaseRef.child("newphotochanges").on("child_changed", function (snapshot) {
    console.log("tukar gambar");
    var noticallcard = new Audio('http://52.76.166.8/epdrm/mapscreenv2/audio/notificationcallcard.mp3');
    noticallcard.play();
    openImg(callcardidsemasa);
});*/
var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
tableFirebaseRef.child("newphotochanges").on("value", function (snapshot) {
    if (globalgambaralert > 0) {
        var noticallcard = new Audio('http://52.76.166.8/epdrm/mapscreenv2/audio/notificationcallcard.mp3');
        noticallcard.play();
        $('#notification').html("New Image Change: CallCard " + snapshot.child('callcardid').val());
        $('#notification').show().delay(5000).fadeOut();
        console.log("kuar");
    }
    globalgambaralert = globalgambaralert + 1;
    if (callcardidsemasa != "" && "" + callcardidsemasa != "undefined") {
        openImg(snapshot.child("callcardid").val());
    }
});

//alert("asdas");
var tableFirebaseRef2 = new Firebase('https://epdrmstatus.firebaseio.com/');
tableFirebaseRef2.child("newstatusinserted2").on("child_changed", function (snapshot) {
    //alert("test");
    printStatus(callcardidsemasa);
});

function pairDevice() {
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/pairdevice.php',
        success: function (response) {
            $('#pair-device').html("");
            //console.log(response);
            if (response != "") {
                $('#pair-device').html(response);
            }
            //$('.image-container').show();
        }
    });
}

function setmpv() {
    $('#qrspin').show();
}

function printStatus(callcardid) {
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getStatus.php',
        data: {
            callcardid: callcardid
        },
        success: function (response) {
            //console.log(response);
            callcardidsemasa = callcardid;
            //alert(response);
            //alert("saya");
            $('#CCstatus tbody').html(response);
            $('#CCstatus').show();
            //alert("saya");
        }
    });
}

function assigntrigger(callcardid) {
    $("#callcardid").val(callcardid);
    //alert($("#callcardid").val());
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/assignmpv_bk.php',
        data: {
            callcardid: callcardid
        },
        success: function (response) {
            //console.log(response);
            $('.assign-content').html(response);

        }
    });
}


function changeStatus(callcardid) {
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/statuschange.php',
        data: {
            callcardid: callcardid
        },
        success: function (response) {
            $('#status-content').html(response);
        }
    });
}

function updateStatus(statusid, callcardid) {
    var TX = Math.random();
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/updatestatus.php?TX=' + TX,
        data: {
            callcardid: callcardid,
            statusid: statusid
        },
        success: function (response) {
            var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
            tableFirebaseRef.update({
                newstatusinserted: {
                    indicate: TX
                }
            })
        }
    });
}

/*var tableFirebaseRef2 = new Firebase('https://epdrmstatus.firebaseio.com/');
tableFirebaseRef2.child("newstatusinserted").on("value", function (snapshot) {
    alert("test");
});*/

/*var tableFirebaseRef2 = new Firebase('https://epdrmstatus.firebaseio.com/');
tableFirebaseRef2.child("newstatusinserted2").on("child_changed", function (snapshot) {
    console.log("test");
    printStatus(callcardidsemasa);
    /*var modal = UIkit.modal("#CCstatus-modal");
    if (modal.isActive()) {
        modal.hide();
    } else {
        modal.show();
    }*/
//});

/*var h1 = document.getElementsById('timerCC')[0],
    seconds = 0,
    minutes = 0,
    hours = 0,
    t;

function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            minutes = 0;
            hours++;
        }
    }

    h1.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    timer();
}

function timer() {
    t = setTimeout(add, 1000);
}
timer();*/
/*function timerCC() {
    // record start time
    var startTime = new Date();
    setTimeout(display, 1000);


    function display() {
        // later record end time
        var endTime = new Date();

        // time difference in ms
        var timeDiff = endTime - startTime;

        // strip the miliseconds
        timeDiff /= 1000;

        // get seconds
        var seconds = Math.round(timeDiff % 60);

        // remove seconds from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get minutes
        var minutes = Math.round(timeDiff % 60);

        // remove minutes from the date
        timeDiff = Math.floor(timeDiff / 60);

        // get hours
        var hours = Math.round(timeDiff);

        $(".time").text(hours + ":" + minutes + ":" + seconds);
        setTimeout(display, 1000);
    }

}*/



function imageLightbox(imgurl, date, time, from) {
    //console.log(imgurl + "" + date + " " + time + " " + from)
    $('.image-lightcont').html("<img src='" + imgurl + "'>");
    $('#photodetail').html("Date: " + date + " | Time: " + time + " | From: " + from);
}

function minimize() {
    $('#min-container').show();
    $('.marker-info').hide();

    if ($('#min-icon').html() != "") {
        $('#min-icon').append("<button class='uk-button uk-button uk-icon-info' title='CallCard Info' onclick='maximize()'></button>");
    } else {
        $('#min-icon').html("<button class='uk-button uk-button uk-icon-info' title='CallCard Info' onclick='maximize()'></button>");
    }
    //alert("min");
}

function minimizeChat() {
    $('#min-container').show();
    if ($('#min-icon').html() != "") {
        $('#min-icon').append("<button class='uk-button uk-button uk-icon-comment' title='Comment' onclick='maximizeChat()'></button>");
    } else {
        $('#min-icon').html("<button class='uk-button uk-button uk-icon-comment' title='Comment' onclick='maximizeChat()'></button>");
    }
    $('.CCcomment').hide();

    //alert("min");
}

function maximize() {
    $('.marker-info').show();
    $('#min-icon').html("");
    $('#min-icon').html("<button class='uk-button uk-button uk-icon-comment' title='Comment' onclick='maximizeChat()'></button>");
    if ($('#min-icon').html() == "") {
        $('#min-container').hide();
    }
}

function maximizeChat() {
    $('.CCcomment').show();
    $('#min-icon').html("");
    $('#min-icon').html("<button class='uk-button uk-button uk-icon-info' title='CallCard Info' onclick='maximize()'></button>");
    if ($('#min-icon').html() == "") {
        $('#min-container').hide();
    }
}

function logout() {
    UIkit.modal.confirm("<span style='font-size:18px'>Confirm Logout?</span>", function () {
        window.location.href = "http://52.76.166.8/epdrm/";
    });
}