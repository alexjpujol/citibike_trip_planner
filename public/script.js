var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7230, lng: -74.0006},
        zoom: 13
    });
}