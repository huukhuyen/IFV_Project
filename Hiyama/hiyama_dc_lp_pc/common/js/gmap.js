var map;
var cent = new google.maps.LatLng(35.5322158,139.739137); // 中心の座標
var MY_MAPTYPE_ID = 'cool';

function initialize() {

    //***** デザインのカスタマイズ部分 *****//
    var stylez = [{
        "featureType": "all",
        "stylers": [{
            "saturation": 0
        }]
    }];
    //***** デザインのカスタマイズ部分 *****//
    var mapOptions = {
        zoom: 15, // マップの拡大値
        navigationControl: false, // マップの拡大縮小等のナビの表示・非表示を行います。
        mapTypeControl: false, // 右上マップタイプ名を表示し、通常マップとの切替を可能にします。
        scaleControl: false, // 左下にスケールを表示します。
        center: cent,
        scrollwheel: true, //マウスホイール禁止
        mapTypeControlOptions: {
            mapTypeIds: [google.maps.MapTypeId.ROADMAP, MY_MAPTYPE_ID]
        },
        mapTypeId: MY_MAPTYPE_ID
    };
    map = new google.maps.Map(document.getElementById("mapCanvas"), mapOptions);
    var styledMapOptions = {
        name: "ひやま歯科クリニック"
    };
    var jayzMapType = new google.maps.StyledMapType(stylez, styledMapOptions);
    map.mapTypes.set(MY_MAPTYPE_ID, jayzMapType);
    var markerOpts = {
        position: new google.maps.LatLng(35.5322158,139.739137), // マーカの座標
        map: map,
    };
    var marker = new google.maps.Marker(markerOpts);
    var infowin = new google.maps.InfoWindow({
        content: "ひやま歯科クリニック"
    });
	google.maps.event.addDomListener(window, "resize", function() {
	var center = map.getCenter();
	google.maps.event.trigger(map, "resize");
	map.setCenter(center);
});
    google.maps.event.addListener(marker, 'click', function() {
        infowin.open(map, marker);
    });
}