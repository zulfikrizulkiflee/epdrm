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
var GLOBALmarker = [];
var callcardidnow;
var GLOBALCCmarker = [];
var markerid = [];
var markerloc = [];
var fbmpvloc = [];

$('document').ready(function () {
    $('.marker-info').hide();
    $('.CCcomment').hide();
    $('.CC-image').hide();
});

//Start initialize map
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
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
new google.maps.LatLng(2.932926201122134, 101.6914701461792),
new google.maps.LatLng(2.9318118631817978, 101.69361591339111),
new google.maps.LatLng(2.9309975386003524, 101.69410407543182),
new google.maps.LatLng(2.9300010616615917, 101.69415771961212),
new google.maps.LatLng(2.9294867506364373, 101.69426500797272),
new google.maps.LatLng(2.9290367282956504, 101.69443666934967),
new google.maps.LatLng(2.9283938389236264, 101.69495165348053),
new google.maps.LatLng(2.928104538585835, 101.69531643390656),
new google.maps.LatLng(2.9275687970222557, 101.6958099603653),
new google.maps.LatLng(2.9273973596677934, 101.69608891010284),
new google.maps.LatLng(2.9270759145574763, 101.69644296169281),
new google.maps.LatLng(2.926754469354974, 101.69663608074188),
new google.maps.LatLng(2.9264758834382105, 101.6968184709549),
new google.maps.LatLng(2.9260901489776074, 101.69704377651215),
new google.maps.LatLng(2.9258222777463163, 101.69722616672516),
new google.maps.LatLng(2.9256133381414626, 101.69733747839928),
new google.maps.LatLng(2.92551154703783, 101.69741526246071),
new google.maps.LatLng(2.92538029007474, 101.69751450419426),
new google.maps.LatLng(2.925305286088941, 101.69756010174751),
new google.maps.LatLng(2.9251847439584044, 101.69762447476387),
new google.maps.LatLng(2.925096346387767, 101.69767543673515),
new google.maps.LatLng(2.924973125520085, 101.69774517416954),
new google.maps.LatLng(2.9248391897790116, 101.69782564043999),
new google.maps.LatLng(2.9247481134659243, 101.6978819668293),
new google.maps.LatLng(2.9245981054047494, 101.69797047972679),
new google.maps.LatLng(2.9235400122604522, 101.6985833644867),
new google.maps.LatLng(2.9230256982703846, 101.69890522956848),
new google.maps.LatLng(2.922361375684314, 101.69905543327332),
new google.maps.LatLng(2.921611333582318, 101.6990339756012),
new google.maps.LatLng(2.9207970015899263, 101.69901251792908),
new google.maps.LatLng(2.9198969497533898, 101.69918417930603),
new google.maps.LatLng(2.919382634094435, 101.6993772983551),
new google.maps.LatLng(2.9187183093531686, 101.69961333274841),
new google.maps.LatLng(2.917818255851434, 101.69984936714172),
new google.maps.LatLng(2.9166610431474553, 101.69987082481384),
new google.maps.LatLng(2.9162538754313556, 101.69976353645325),
new google.maps.LatLng(2.915889567349902, 101.69954895973206),
new google.maps.LatLng(2.915525259150437, 101.6993772983551),
new google.maps.LatLng(2.9148609321301, 101.69864773750305),
new google.maps.LatLng(2.9144966235975795, 101.69824004173279),
new google.maps.LatLng(2.9140251653216285, 101.69787526130676),
new google.maps.LatLng(2.913617996651642, 101.69753193855286),
new google.maps.LatLng(2.913103678121168, 101.69705986976624),
new google.maps.LatLng(2.9126536492142914, 101.69663071632385),
new google.maps.LatLng(2.9121607602051633, 101.69620156288147),
new google.maps.LatLng(2.912053610392028, 101.69581532478333),
new google.maps.LatLng(2.912010750463918, 101.6954505443573),
new google.maps.LatLng(2.9121179002811384, 101.69506430625916),
new google.maps.LatLng(2.9121821901665723, 101.69446349143982),
new google.maps.LatLng(2.9125464994480366, 101.69272541999817),
new google.maps.LatLng(2.9119036006365078, 101.69139504432678),
new google.maps.LatLng(2.911667870980344, 101.68931365013123),
new google.maps.LatLng(2.9106820918837535, 101.68821930885315),
new google.maps.LatLng(2.910103482012372, 101.68746829032898),
new google.maps.LatLng(2.9096105918876463, 101.68736100196838),
new google.maps.LatLng(2.9091605615855496, 101.68695330619812),
new google.maps.LatLng(2.908624810991689, 101.68620228767395),
new google.maps.LatLng(2.9085605209033356, 101.68583750724792),
new google.maps.LatLng(2.9082605004424806, 101.68573021888733),
new google.maps.LatLng(2.907831899645701, 101.6850221157074),
new google.maps.LatLng(2.90725328831171, 101.68431401252747),
new google.maps.LatLng(2.906717536811938, 101.68392777442932),
new google.maps.LatLng(2.906117494830226, 101.68367028236389),
new google.maps.LatLng(2.9052817215383717, 101.68343424797058),
new google.maps.LatLng(2.9047888293069737, 101.68343424797058),
new google.maps.LatLng(2.903481592347009, 101.68347716331482),
new google.maps.LatLng(2.9023243649234494, 101.68315529823303),
new google.maps.LatLng(2.901810041243682, 101.68291926383972),
new google.maps.LatLng(2.9010385552852487, 101.6821038722992),
new google.maps.LatLng(2.90063138192827, 101.68191075325012),
new google.maps.LatLng(2.90060995174753, 101.68130993843079),
new google.maps.LatLng(2.900567091384817, 101.68019413948059),
new google.maps.LatLng(2.9006742422885523, 101.67972207069397),
new google.maps.LatLng(2.9010814156300873, 101.6786277294159),
new google.maps.LatLng(2.901917192029597, 101.67770504951477),
new google.maps.LatLng(2.9021529237228556, 101.67727589607239),
new google.maps.LatLng(2.90296726919398, 101.67731881141663),
new google.maps.LatLng(2.9042316465254436, 101.67719006538391),
new google.maps.LatLng(2.9050245604010154, 101.67637467384338),
new google.maps.LatLng(2.9057103233038086, 101.675945520401),
new google.maps.LatLng(2.9056674631345882, 101.67534470558167),
new google.maps.LatLng(2.9058817639644077, 101.67478680610657),
new google.maps.LatLng(2.9063317955746033, 101.67431473731995),
new google.maps.LatLng(2.9072961484207034, 101.67412161827087),
new google.maps.LatLng(2.9080462000644527, 101.67444348335266),
new google.maps.LatLng(2.9083890806497714, 101.67500138282776),
new google.maps.LatLng(2.908646241020334, 101.67553782463074),
new google.maps.LatLng(2.9094177217801636, 101.67626738548279),
new google.maps.LatLng(2.9105106519528245, 101.67656779289246),
new google.maps.LatLng(2.912053610392028, 101.67633175849915),
new google.maps.LatLng(2.9127015279540016, 101.67681171300535),
new google.maps.LatLng(2.9129750984518616, 101.67770504951477),
new google.maps.LatLng(2.9132751176574403, 101.67837023735046),
new google.maps.LatLng(2.9137680061787727, 101.6790783405304),
new google.maps.LatLng(2.9144109039257313, 101.67972207069397),
new google.maps.LatLng(2.9163181650805376, 101.68047308921814),
new google.maps.LatLng(2.917111070451638, 101.6804301738739),
new google.maps.LatLng(2.9179682648184433, 101.68073058128357),
new google.maps.LatLng(2.9187183093531686, 101.68015122413635),
new google.maps.LatLng(2.9188040286966817, 101.67978644371033),
new google.maps.LatLng(2.920518414193786, 101.6805374622345),
new google.maps.LatLng(2.920218396920661, 101.6813313961029),
new google.maps.LatLng(2.9210755889169477, 101.68223261833191),
new google.maps.LatLng(2.921889920707285, 101.68266177177429),
new google.maps.LatLng(2.9233257147932425, 101.68261885643005),
new google.maps.LatLng(2.924932944799449, 101.68386340141296),
new google.maps.LatLng(2.9264973131265744, 101.6844642162323),
new google.maps.LatLng(2.9276973750208684, 101.68470025062561),
new google.maps.LatLng(2.928640279893201, 101.68534398078918),
new google.maps.LatLng(2.9291331616696072, 101.68628811836243),
new google.maps.LatLng(2.9297546209915364, 101.68686747550964),
new google.maps.LatLng(2.930526087256039, 101.68712496757507),
new google.maps.LatLng(2.930804672165317, 101.68819785118103),
new google.maps.LatLng(2.9309975386003524, 101.6889488697052),
new google.maps.LatLng(2.9318332927680277, 101.68954968452454),
new google.maps.LatLng(2.931704715244412, 101.69025778770447),
new google.maps.LatLng(2.932583328027976, 101.69100880622864)];

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

        $.ajax({
            type: "POST",
            url: "http://52.76.166.8/epdrm/mapscreenv2/refresh_mpv_loc.php",
            data: {
                "id": id,
                "lat": lat,
                "lng": lng
            },
            success: function (response) {
                console.log("dapat");
            }
        });

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
    if (id != "") {
        /*mpvmarker[id] = new google.maps.Marker({
                position: location,
                map: map,
                icon: 'img/transport.png?tx=' + tx,
                title: fullname,
            });
            //mpvmarker.setPosition(location);
            mpvmarker[id].setMap(map);*/

        if (markerid.indexOf(id) == -1) {
            markerid.push(id);
            markerloc.push(mpvcoord);
        } else {
            markerloc[(markerid.indexOf(id))] = mpvcoord;
        }
        //console.log("" + markerid);
        //console.log("" + markerloc);

        mpvmarker = new google.maps.Marker({
            position: mpvcoord,
            map: map,
            title: mpvfullname,
            icon: mpvicon,
        });

        //clearkan
        var x = "" + GLOBALmarker[id];
        if (x == "undefined") {} else {
            console.log("GLOBALmarker[id]==" + GLOBALmarker[id]);
            GLOBALmarker[id].setMap(null);
        }
        //setting..
        GLOBALmarker[id] = mpvmarker;
        mpvmarker = GLOBALmarker[id];

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

var tableFirebaseRef = new Firebase('https://epdrmtable.firebaseio.com/');
tableFirebaseRef.child("newrowinserted").on("value", function (snapshot) {
    console.log("testabc");
    //initMap();
    drawCCmarker(map, bangsar);
    callcardreport();
});
tableFirebaseRef.child("rowclosed").on("value", function (snapshot) {
    console.log("test");
    //initMap();
    ccmarker.setMap(null);
    drawCCmarker(map, bangsar);
    callcardreport();
});

//Start Generate CCmarker
function drawCCmarker(map, bangsar) {
    //Start calling Callcard data
    tx = Math.random();
    $.ajax({
        url: 'http://52.76.166.8/epdrm/mapscreenv2/getCallCardCoord.php?tx=' + tx,
        data: {
            'action': 'go_ajax',
            'fn': 'spw_autosuggest',
        },
        dataType: 'JSON',
        success: function (data) {
            console.log("" + data);
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

                    console.log("" + incidentcoord + " -" + (i + 1));

                    /*cc = incidentcoord;

                    var titlestr = "CallCard ID: " + callcardid + " Received Time: " + receiveddatetime;

                    //nearestResources(incidentcoord, '');
                    //var tx = Math.random();
                    var imagemarker = {
                        url: 'img/pulse.gif',
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(25, 25),
                        scaledSize: new google.maps.Size(80, 80)
                    };*/

                    /*ccmarker = new google.maps.Marker({
                        position: cc,
                        map: map,
                        icon: imagemarker,
                        title: titlestr,
                        optimized: false
                    });*/
                    //ccmarker.setMap(map);
                    drawCCMarkerOnly(map, receiveddatetime, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid)
                        //bindInfoWindowCC(ccmarker, map, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid);
                }
            }
        }
    });
}
//End generate CCmarker

function drawCCMarkerOnly(map, receiveddatetime, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid) {
    if (callcardid != "") {
        /*mpvmarker[id] = new google.maps.Marker({
                position: location,
                map: map,
                icon: 'img/transport.png?tx=' + tx,
                title: fullname,
            });
            //mpvmarker.setPosition(location);
            mpvmarker[id].setMap(map);*/

        cc = incidentcoord;

        var titlestr = "CallCard ID: " + callcardid + " Received Time: " + receiveddatetime;

        //nearestResources(incidentcoord, '');
        //var tx = Math.random();
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

        //clearkan
        var x = "" + GLOBALCCmarker[callcardid];
        if (x == "undefined") {} else {
            //console.log("GLOBALCCmarker[id]==" + GLOBALCCmarker[callcardid]);
            GLOBALCCmarker[callcardid].setMap(null);
        }
        //setting..
        GLOBALCCmarker[callcardid] = ccmarker;
        ccmarker = GLOBALCCmarker[callcardid];

        bindInfoWindowCC(ccmarker, map, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid);
    }
}

//Start callcard listener
function bindInfoWindowCC(ccmarker, map, incidentdetails, incidentcoord, ccinfowindow, incidentlat, incidentlng, callcardid) {
    ccmarker.addListener('click', function () {
        //alert(incidentdetails);
        callcardidnow = callcardid;
        printStatus(callcardid);
        nearestResources(incidentcoord);
        var geocoder = new google.maps.Geocoder();

        //console.log(incidentlat);

        var latlng = {
            lat: parseFloat(incidentlat),
            lng: parseFloat(incidentlng)
        };

        /*var circle = new google.maps.Circle({
            map: map,
            radius: 100,
            fillColor: '#AA0000',
            center: ccmarker.getPosition()
        });
        circle.bindTo('center', ccmarker, 'position');*/

        geocoder.geocode({
            'location': latlng
        }, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                if (results[1]) {
                    var address = results[1].formatted_address;
                    $('.marker-info').html("<b>Callcard Title: </b>" + incidentdetails + "<br><b>Coordinate: </b>" + incidentcoord + "<br><b>Address: </b>" + address + "<br><b>Nearest Resources: </b><ul><li>" + mpvarrname[0] + " - " + mpvarrnear[0].toFixed() + "km</li><li>" + mpvarrname[1] + " - " + mpvarrnear[1].toFixed() + "km</li></ul><button class='uk-button uk-icon-minus-square-o uk-icon-medium' title='Minimize' onclick='minimize()' style='float:right'></button>");
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
        //circle.setMap(null);
        ccinfowindow.close();
        $('.marker-info').hide();
        $('.CCcomment').hide();
        $('.marker-info').html("");
        directionsDisplay.setMap(null);
        $('#CCstatus').hide();
        $('#min-container').hide();

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
        //mpvinfowindow.close();
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
        console.log("" + mpvarr[i]);
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
    console.log(callcardid);
    callcardidnow = callcardid;
    var currentdate = "" + new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }).split(' ').join(' ');

    var prevdate = currentdate;

    console.log(currentdate);

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
                        if (data.child('sentby').val() == "BCC") {
                            if (data.child("sentdate").val() != prevdate) {
                                $('#resources-comment').append("<div style='text-align:center'>" + data.child('sentdate').val() + "</div>");
                                prevdate = data.child("sentdate").val();
                            }
                            $('#resources-comment').append("<div style='text-align:right'>" + data.child('msg').val() + " : <b><span style='color:aqua'>" + data.child('sentby').val() + "</span></b><br><span style='font-size:11px;'>" + data.child('senttime').val() + "</span></div><br>");
                            $('#resources-comment').scrollTop($('#resources-comment')[0].scrollHeight);

                        } else {
                            var noticallcard = new Audio('audio/notificationcallcard.mp3');
                            noticallcard.play();
                            $('#notification').html("New Message Received");
                            $('#notification').show().delay(5000).fadeOut();
                            if (data.child("sentdate").val() != prevdate) {
                                $('#resources-comment').append("<div style='text-align:center'>" + data.child('sentdate').val() + "</div>");
                                prevdate = data.child("sentdate").val();
                            }
                            $('#resources-comment').append("<div style='text-align:left'><b><span style='color:red'>" + data.child('sentby').val() + "</span></b>: " + data.child('msg').val() + "<br><span style='font-size:11px;'>" + data.child('senttime').val() + "</span></div><br>");
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

                if (chat != "") {
                    myFirebaseRef.push().set({
                        'img': pic,
                        'username': username,
                        'msg': chat,
                        'receivedby': 'MPV1',
                        'sentby': username,
                        'sentdatetime': currentdatetime,
                        'sentdate': currentdate,
                        'senttime': currenttime,
                        'callcardid': callcardidnow
                    });
                }
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

function getlocation(userid, callcardid) {
    //alert(userid + "|" + callcardid);
    var locstr = markerloc[(markerid.indexOf(userid.toString()))];
    //console.log(locstr);
    //var mpvlocation=new google.maps.LatLng(incidentlat, incidentlng);
    var modal = UIkit.modal("#resources");
    if (modal.isActive()) {
        modal.hide();
    } else {
        modal.show();
    }
    map.panTo(locstr);
    map.setZoom(17);
}