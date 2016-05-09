var map;
function initMap() {
    
    //initialize the directions objects
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    //initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7230, lng: -74.0006},
        zoom: 12
    });
    //tie the directions to the map
    directionsDisplay.setMap(map);
    
    //add the bike routes in
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    
    //load in the Citibike station data from the JSON file
    $("#pins").click(function() {
        map.data.loadGeoJson('data.json');
    })
    
    //add event listeners to the pins
//    var origin;
//    var destination;
    
    map.data.addListener('click', function(e){
        document.getElementById("station").textContent = e.feature.H.Station;
        console.log(e.feature.H)
    })

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: "173 Ludlow St, New York, NY 10002",
            destination: "90 John St, New York, NY 10038",
            travelMode: google.maps.TravelMode.BICYCLING
        }, 
        
        function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
            } else {
            window.alert('Directions request failed due to ' + status);
            }
        });
    }
    
    $("#route").click(function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
}
