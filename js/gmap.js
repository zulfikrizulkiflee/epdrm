var map;
var bangsar;
var infoWindow;
var marker;
var mpvmarkerarr = [];
var mpvarr = [];
var mpvarrname = [];
var mpvarrnear = [];
var directionsService;
var directionsDisplay;
var distance;
var mpvinfowindow;
var mpvprevid;
var prioritymarker = [];


$('document').ready(function () {
    $('.marker-info').hide();
    $('.CCcomment').hide();
    $('.CC-image').hide();
});

//Start initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {
            lat: 3.1295462178004865,
            lng: 101.66061401367188
        },
        disableDoubleClickZoom: true,
        scaleControl: true,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });

    var geocoder = new google.maps.Geocoder();



    //calculateAndDisplayRoute(directionsService, directionsDisplay, '', '', '');

    google.maps.Polygon.prototype.getBounds = function () {
        var bounds = new google.maps.LatLngBounds();
        var paths = this.getPaths();
        var path;
        for (var i = 0; i < paths.getLength(); i++) {
            path = paths.getAt(i);
            for (var ii = 0; ii < path.getLength(); ii++) {
                bounds.extend(path.getAt(ii));
            }
        }
        return bounds;
    }

    // Define the LatLng coordinates for the geofencing.
    var bangsarCoords = [
        {
            lat: 3.180674,
            lng: 101.600477
                },
        {
            lat: 3.178228,
            lng: 101.755829
                },
        {
            lat: 3.064143,
            lng: 101.683303
                },
        {
            lat: 3.104596,
            lng: 101.586830
                },
        {
            lat: 3.180674,
            lng: 101.600477
                }
  ];

    // Start Construct geofencing.
    bangsar = new google.maps.Polygon({
        paths: bangsarCoords,
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 3,
        fillColor: '#FF0000',
        fillOpacity: 0.05,
        clickable: false
    });
    bangsar.setMap(map);

    var bangsarbound = bangsar.getBounds();

    map.fitBounds(bangsarbound);

    //function recenter() {
    $('#recenter').click(function () {
        map.fitBounds(bangsarbound);
        //map.panTo(center);
        //map.setZoom(13);
    });
    //}
    // End Construct geofencing.

    drawCCmarker(map, bangsar);
    dbMPVmarker(map);
    fbMPVmarker(map);

    //Start map listener
    map.addListener('dblclick', function (e) {
        if (google.maps.geometry.poly.containsLocation(e.latLng, bangsar)) {
            UIkit.modal.confirm("<span style='font-size:18px'>Create CallCard here?</span>", function () {
                //alert("success");
                //alert(e.latLng);
                var latLngstr = e.latLng.toString();
                //console.log(latLngstr);
                var latLngrep = latLngstr.replace("(", "").replace(")", "").replace(" ", "");
                //console.log(latLngrep);
                var latLngspl = latLngrep.split(",");
                //console.log(latLngspl[0]);
                $('#lat').val(latLngspl[0]);
                $('#lng').val(latLngspl[1]);
                var geocoder = new google.maps.Geocoder();
                var latlng = {
                    lat: parseFloat(latLngspl[0]),
                    lng: parseFloat(latLngspl[1])
                };
                geocoder.geocode({
                    'location': latlng
                }, function (results, status) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        if (results[1]) {
                            var address = results[1].formatted_address;
                            $('#city').val(address);
                        } else {
                            $('#city').val('');
                        }
                    } else {
                        UIkit.modal.alert('Geocoder failed due to: ' + status);
                    }
                });
                var modal = UIkit.modal("#newCC");
                if (modal.isActive()) {
                    modal.hide();
                } else {
                    modal.show();
                }
            });
        } else
            UIkit.modal.alert("<span style='font-size:18px'>Cannot create callcard outside your boundries.</span>");
        $('.marker-info').html("");
    });
    //End Map listener

    /*document.getElementById('submit').addEventListener('click', function () {
        geocodeSearchAddress(geocoder, map);
    });*/
}
//End initialize map

function dbMPVmarker(map) {
    directionsService = new google.maps.DirectionsService;
    directionsDisplay = new google.maps.DirectionsRenderer;
    //Start calling MPV data from db
    $.ajax({
        type: 'GET',
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getmpvlocation.php',
        data: {
            'action': 'go_ajax',
            'fn': 'spw_autosuggest',
        },
        dataType: 'JSON',
        //timeout: 1000,
        success: function (data) {
            console.log("timeout");
            mpvinfowindow = new google.maps.InfoWindow({
                content: ""
            });

            for (var i = 0; i < data.length; i++) {
                var userid = "" + data[i].userid;
                var mpvlat = "" + data[i].lat;
                var mpvlng = "" + data[i].lng;
                var mpvfullname = "" + data[i].fullname;
                var mpvstationid = "" + data[i].stationid;
                var mpvcoord = new google.maps.LatLng(mpvlat, mpvlng);
                var mpv = [{
                        "title": mpvfullname,
                        "lat": mpvlat,
                        "lng": mpvlng
                        }
                        ];

                var mpvcoord = new google.maps.LatLng(mpvlat, mpvlng);

                mpvprevid = userid;

                mpvarr.push(mpvcoord);
                mpvarrname.push(mpvfullname);

                var mpvicon = "";
                if (mpvstationid == 1) {
                    mpvicon = 'img/transport.png';
                } else {
                    mpvicon = ' '; //'http://maps.google.com/mapfiles/ms/icons/yellow-dot.png';
                }

                drawMarkerOnly(mpvcoord, map, mpvfullname, mpvicon, mpvinfowindow, mpvlat, mpvlng, directionsService, directionsDisplay, userid);

                //drawMarkerOnly('', '', '', mpvicon, mpvinfowindow, mpvlat, mpvlng, directionsService, directionsDisplay);

            }

        }
    });
    //End calling MPV data


}

function fbMPVmarker(map) {
    //obtain mpv location from firebase
    var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
    tableFirebaseRef.child("dataMpvTracking/fulldata").on("value", function (snapshot) {
        console.log("moved");
        var tx = Math.random();
        var imagempv = {
            url: 'img/transport.png?tx=' + tx,
            //scaledSize: new google.maps.Size(60, 60)
        };

        var fulldata = snapshot.val();
        var arr = fulldata.split('|');
        var id = arr[0];
        var lat = arr[1];
        var lng = arr[2];
        var ccid = arr[3];
        var fullname = arr[4];
        var mpvicon = imagempv;
        //mpvmarker[id].setMap(null);

        for (var i = 0; i < arr.length; i++)
            var mpv = [{
                    "id": id,
                    "lat": lat,
                    "lng": lng,
                    "fullname": fullname
                        }
                        ];
        var mpvcoord = new google.maps.LatLng(lat, lng);
        drawMarkerOnly(mpvcoord, map, fullname, mpvicon, mpvinfowindow, lat, lng, directionsService, directionsDisplay, id);

        //console.log("" + mpvcoord);
    });
    //end getting mpv location from firebase
}

function drawMarkerOnly(mpvcoord, map, mpvfullname, mpvicon, mpvinfowindow, mpvlat, mpvlng, directionsService, directionsDisplay, id) {
    if (id != "" && id == mpvprevid) {

    }
    if (id != "") {
        mpvmarker = new google.maps.Marker({
            position: mpvcoord,
            map: map,
            title: mpvfullname,
            icon: mpvicon,
        });

        bindInfoWindowMPV(mpvmarker, map, mpvfullname, mpvcoord, mpvinfowindow, mpvlat, mpvlng, directionsService, directionsDisplay);
        /*mpvmarker.addListener('click', function () {
            $('#CCstatus').hide();
            $('.CCcomment').hide();
            //alert(mpvlat);
            $('.marker-info').html("Name: " + mpvfullname + "<br>Coordinate: " + mpvcoord);
            $('.marker-info').show();
            mpvinfowindow.setContent(mpvfullname);
            mpvinfowindow.open(map, mpvmarker);
            //calculateAndDisplayRoute('', '', mpvlat, mpvlng, '');
            //map.panTo(mpvcoord);
            //map.setZoom(15);

            /*var mpvlatrec = mpvlat;
            var mpvlngrec = mpvlng;
            var mpvloc = mpvlatrec + "," + mpvlngrec;

            directionsService.route({
                origin: mpvloc,
                destination: "3.139172, 101.68685499999992",
                // Note that Javascript allows us to access the constant
                // using square brackets and a string value as its
                // "property."
                travelMode: google.maps.TravelMode.DRIVING
            }, function (response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                    directionsDisplay.setDirections(response);
                    //alert(response.routes[0].legs[0].distance.value / 1000);
                } else {
                    UIkit.modal.alert('Directions request failed due to ' + status);
                }
            });
            directionsDisplay.setMap(map);
            directionsDisplay.setOptions({
                suppressMarkers: true
            });
        });

        map.addListener('click', function () {
            mpvinfowindow.close();
            $('.marker-info').hide();
            $('.marker-info').html("");
            $('.CC-image').hide();
            $('.CC-image').html("");
        });*/
    }
}

//Start Generate CCmarker
function drawCCmarker(map, bangsar) {
    //Start calling Callcard data
    $.ajax({
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getCallCardCoord.php',
        data: {
            'action': 'go_ajax',
            'fn': 'spw_autosuggest',
        },
        dataType: 'JSON',
        success: function (data) {
            //console.log(data);
            var ccinfowindow = new google.maps.InfoWindow({
                content: ""
            });

            for (var i = 0; i < data.length; i++) {
                var incidentlat = "" + data[i].incidentlat;
                var incidentlng = "" + data[i].incidentlng;
                var callcardid = "" + data[i].callcardid;
                var incidentdetails = "" + data[i].incidentdetails;
                var receiveddatetime = "" + data[i].receiveddatetime;
                var incidentcoord = new google.maps.LatLng(incidentlat, incidentlng);
                if (google.maps.geometry.poly.containsLocation(incidentcoord, bangsar)) {
                    var callcard = [{
                            "title": callcardid,
                            "lat": incidentlat,
                            "lng": incidentlng,
                            "description": incidentdetails
                        }
                        ];

                    var incidentcoord = new google.maps.LatLng(incidentlat, incidentlng);

                    //console.log("" + incidentcoord);

                    cc = incidentcoord;

                    var titlestr = "CallCard ID: " + callcardid + " Received Time: " + receiveddatetime;

                    //nearestResources(incidentcoord, '');
                    var imagemarker = {
                        url: 'img/pulse.gif',
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(25, 25),
                        scaledSize: new google.maps.Size(80, 80)
                    };

                    ccmarker = new google.maps.Marker({
                        position: cc,
                        map: map,
                        icon: imagemarker,
                        title: titlestr,
                        optimized: false
                    });
                    //ccmarker.setMap(map);
                    bindInfoWindowCC(ccmarker, map, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid);
                }
            }
        }
    });
}
//End generate CCmarker

var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
tableFirebaseRef.child("newrowinserted").on("child_changed", function (snapshot) {
    console.log("test");
    //initMap();
    drawCCmarker(map, bangsar);
});
tableFirebaseRef.child("rowclosed").on("child_changed", function (snapshot) {
    console.log("test");
    //initMap();
    ccmarker.setMap(null);
    drawCCmarker(map, bangsar);
});

//Start callcard listener
function bindInfoWindowCC(ccmarker, map, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid) {
    ccmarker.addListener('click', function () {
        //alert(incidentdetails);
        printStatus(callcardid);
        nearestResources(incidentcoord);
        var geocoder = new google.maps.Geocoder();

        //console.log(incidentlat);

        var latlng = {
            lat: parseFloat(incidentlat),
            lng: parseFloat(incidentlng)
        };
        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var address = results[1].formatted_address;
                    $('.marker-info').html("<b>Callcard Title: </b>" + incidentdetails + "<br><b>Coordinate: </b>" + incidentcoord + "<br><b>Address: </b>" + address + "<br><b>Nearest Resources: </b><ul><li>" + mpvarrname[0] + " - " + mpvarrnear[0].toFixed() + "km</li><li>" + mpvarrname[1] + " - " + mpvarrnear[1].toFixed() + "km</li><li>" + mpvarrname[2] + " - " + mpvarrnear[2].toFixed() + "km</li></ul>");
                } else {
                    UIkit.modal.alert('No results found');
                }
            } else {
                UIkit.modal.alert('Geocoder failed due to: ' + status);
            }
        });
        $('.marker-info').show();
        $('.CCcomment').show();
        chatsystem(callcardid);
        openImg(callcardid);
        ccinfowindow.setContent(incidentdetails);
        ccinfowindow.open(map, ccmarker);
        map.panTo(incidentcoord);
        map.setZoom(17);
        //mpvarrnear = [];
    });

    map.addListener('click', function () {
        ccinfowindow.close();
        $('.marker-info').hide();
        $('.CCcomment').hide();
        $('.marker-info').html("");
        directionsDisplay.setMap(null);
        $('#CCstatus').hide();
    });
}
//End callcard listener

//Start MPV listener
function bindInfoWindowMPV(mpvmarker, map, mpvfullname, mpvcoord, mpvinfowindow, mpvlat, mpvlng, directionsService, directionsDisplay) {
    mpvmarker.addListener('click', function () {
        $('#CCstatus').hide();
        $('.CCcomment').hide();
        //alert(mpvlat);
        $('.marker-info').html("Name: " + mpvfullname + "<br>Coordinate: " + mpvcoord);
        $('.marker-info').show();
        mpvinfowindow.setContent(mpvfullname);
        mpvinfowindow.open(map, mpvmarker);
        //calculateAndDisplayRoute('', '', mpvlat, mpvlng, '');
        //map.panTo(mpvcoord);
        //map.setZoom(15);

        /*var mpvlatrec = mpvlat;
        var mpvlngrec = mpvlng;
        var mpvloc = mpvlatrec + "," + mpvlngrec;

        directionsService.route({
            origin: mpvloc,
            destination: "3.139172, 101.68685499999992",
            // Note that Javascript allows us to access the constant
            // using square brackets and a string value as its
            // "property."
            travelMode: google.maps.TravelMode.DRIVING
        }, function (response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                //alert(response.routes[0].legs[0].distance.value / 1000);
            } else {
                UIkit.modal.alert('Directions request failed due to ' + status);
            }
        });
        directionsDisplay.setMap(map);
        directionsDisplay.setOptions({
            suppressMarkers: true
        });*/
    });

    map.addListener('click', function () {
        mpvinfowindow.close();
        $('.marker-info').hide();
        $('.marker-info').html("");
        $('.CC-image').hide();
        $('.CC-image').html("");
    });
}
//End MPV listener*/

//Start find nearest resources
function nearestResources(incidentcoords) {
    mapvarrnear = [];

    for (i = 0; i < mpvarr.length; i++) {
        //var distance = 3.456;
        var distance = google.maps.geometry.spherical.computeDistanceBetween(mpvarr[i], incidentcoords) / 1000;
        mpvarrnear[i] = distance;
    }
}
//End find nearest resources

//Start search box
function geocodeSearchAddress(geocoder, resultsMap) {
    //var initaddress = document.getElementById('address').value;
    var input = document.getElementById('address');
    var address = input.value;
    geocoder.geocode({
        'address': address
    }, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            resultsMap.setCenter(results[0].geometry.location);
            /*var marker = new google.maps.Marker({
                map: resultsMap,
                position: results[0].geometry.location
            });*/
            map.setZoom(17);
        } else {
            UIkit.modal.alert('Address cannot be found. Error: ' + status);
        }
    });
}
//End Search box

function showCC(callcardid, incidentlat, incidentlng) {
    var incidentcoord = new google.maps.LatLng(parseFloat(incidentlat), parseFloat(incidentlng));
    var table = UIkit.modal('#CCtable-modal');
    if (table.isActive()) {
        table.hide();
    } else {
        table.show();
    }
    /*var comment = UIkit.modal('.CCcomment');
    if (comment.isActive()) {
        comment.hide();
    } else {
        comment.show();
    }
    var info = UIkit.modal('.marker-info');
    if (info.isActive()) {
        info.hide();
    } else {
        info.show();
    }
    var status = UIkit.modal('#CCstatus');
    if (status.isActive()) {
        status.hide();
    } else {
        status.show();
    }*/
    map.panTo(incidentcoord);
    map.setZoom(18);
}

//chat system
function chatsystem(callcardid) {
    //console.log(callcardid);
    var myFirebaseRef = new Firebase('https://epdrm.firebaseio.com/');
    myFirebaseRef.on("value", function (snapshot) {
        $('#resources-comment').html("");
        //if (data.child("username").val() != "COMMAND CENTER") {
        var i_chat_counter = 1;
        //}
        //alert(callcardidbaru);
        if (callcardid != "" && "" + callcardid != "undefined") {
            snapshot.forEach(function (data) {
                if (data.child('msg').val() != "") {
                    if (data.child("callcardid").val() == callcardid) {
                        if (data.child('sentby') != "BCC") {
                            var noticallcard = new Audio('audio/notificationcallcard.mp3');
                            noticallcard.play();
                            $('#notification').html("New Message Received");
                            $('#notification').show().delay(5000).fadeOut();
                            $('#resources-comment').append("<div><b>" + data.child('sentby').val() + "</b>: " + data.child('msg').val() + "<br><span style='font-size:11px;'>" + data.child('sentdatetime').val() + "</span></div><br><br>");
                            $('#resources-comment').scrollTop($('#resources-comment')[0].scrollHeight);
                        }
                    }
                }
            });
        }
    });



    $('#HQ-send').click(function () {
        var chat = ($('#HQ-comment').val());
        var pic = "http://vectorise.net/vectorworks/logos/Jabatan%20Kerajaan/downloads/uniforms/Logo%20Polis.png";
        var username = "BCC";
        //var callcardid = callcardid;
        var TX = Math.random();

        $.ajax({
            type: "POST",
            url: "http://52.76.166.8/epdrm/api_generator.php?api_name=M_GET_CURRENTDATETIME_X&TX=" + TX,
            cache: false,
            timeout: 15 * 1000,
            error: function (xhr, textStatus, errorThrown) {
                return false;
            },
            success: function (response) {
                var jsonObj = JSON.parse(response);
                var currentdatetime = "" + jsonObj[0].currentdatetime;
                var currentdate = "" + jsonObj[0].currentdate;
                var currenttime = "" + jsonObj[0].currenttime;

                myFirebaseRef.push().set({
                    'img': pic,
                    'username': username,
                    'msg': chat,
                    'receivedby': 'MPV1',
                    'sentby': username,
                    'sentdatetime': currentdatetime,
                    'sentdate': currentdate,
                    'senttime': currenttime,
                    'callcardid': callcardid
                });
            }
        });

        $("#HQ-comment").val('');
    });
}

function sendChatNotification() {
    var TX = Math.random();
    $.ajax({
        type: "POST",
        url: "http://52.76.166.8/epdrm/api_generator.php?api_name=M_SEND_GCM_NOTIFICATION&TX=" + TX,
        data: {
            title: "Message from COMMAND CENTER",
            message: "Message from COMMAND CENTER",
            userid: 14
        },
        cache: false,
        timeout: 15 * 1000,
        error: function (xhr, textStatus, errorThrown) {
            return false;
        },
        success: function (response) {

        }
    });
}
//end chat system