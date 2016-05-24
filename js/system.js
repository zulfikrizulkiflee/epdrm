$('document').ready(function () {
    $('#qrspin').hide();
    $('#notification').hide();
    $('#CCstatus').hide();
});

$(function () {
    $(".draggable").draggable({
        containment: "#map"
    });
    $(".resizable").resizable();
});

var report = "";
$.ajax({
    type: "POST",
    url: "http://52.76.166.8/epdrm/mapscreenv2/reportTable.php",
    success: function (response) {
        $('.callcard-info').html(response);
    }
});

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

function deleteCC(callcardid) {
    UIkit.modal.confirm("<span style='font-size:18px'>Delete CallCard with ID: " + callcardid + "</span>", function () {
        $.ajax({
            type: "POST",
            url: "http://52.76.166.8/epdrm/mapscreenv2/deleteCC.php",
            data: {
                "callcardid": callcardid
            },
            success: function (response) {
                $('#CCtable tbody').html("");
                loadCC();
            }
        });
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

function submitnew() {
    var name = $('#name').val();
    var phone = $('#phone').val();
    var city = $('#city').val();
    var lat = $('#lat').val();
    var lng = $('#lng').val();
    var detail = $('#detail').val();

    $.ajax({
        type: 'POST',
        url: 'http://52.76.166.8/epdrm/mapscreenv2/newcallcard.php',
        data: {
            name: name,
            phone: phone,
            city: city,
            lat: lat,
            lng: lng,
            detail: detail
        },
        success: function (response) {
            var noticallcard = new Audio('audio/notificationcallcard.mp3');
            noticallcard.play();
            $('#notification').html("New CallCard Received");
            $('#notification').show().delay(5000).fadeOut();
            var name = $('#name').val("");
            var phone = $('#phone').val("");
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
            drawCCmarker();
        }
    });

    return false;
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

function openImg(callcardid) {
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getImage.php',
        data: {
            'callcardid': callcardid
        },
        success: function (response) {
            //console.log(response);
            if (response != "") {
                $('.CC-image').html(response);
                $('.CC-image').show();
            }
            //$('.image-container').show();
        }
    });
}

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
    $('#qrspin').show();;
}

function printStatus(callcardid) {
    $.ajax({
        type: "POST",
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getStatus.php',
        data: {
            callcardid: callcardid
        },
        success: function (response) {
            $('#CCstatus tbody').html(response);
            $('#CCstatus').show();
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