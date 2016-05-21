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
    url: "reportTable.php",
    success: function (response) {
        $('.callcard-info').html(response);
    }
});

function printCCTable() {
    $.ajax({
        type: "POST",
        url: "getTable.php",
        success: function (response) {
            $('#CCtable tbody').html(response);
        }
    });
}

function mpvlist() {
    $.ajax({
        type: "POST",
        url: "mpvlocatorajax.php",
        success: function (response) {
            $('.mpv').html(response);
        }
    });
}

function deleteCC(callcardid) {
    UIkit.modal.confirm("<span style='font-size:18px'>Delete CallCard with ID: " + callcardid + "</span>", function () {
        $.ajax({
            type: "POST",
            url: "deleteCC.php",
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
        url: "getTable.php",
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
        url: 'newcallcard.php',
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
        url: "reportTable.php", //here goes your php script file where you want to pass value
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
        url: 'getImage.php',
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
        url: 'pairdevice.php',
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
        url: 'getStatus.php',
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
        url: 'assignmpv_bk.php',
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
    $("#callcardid").val(callcardid);
    $.ajax({
        type: "POST",
        url: 'statuschange.php',
        data: {
            callcardid: callcardid
        },
        success: function (response) {
            console.log(response);
            $('#status-content').html(response);

        }
    });
}