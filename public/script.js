var map;
function initMap() {
    
    //initialize the directions objects
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    
    //initialize the map
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 40.7230, lng: -74.0006},
        zoom: 13
    });
    //tie the directions to the map
    directionsDisplay.setMap(map);
    
    //add the bike routes in
    var bikeLayer = new google.maps.BicyclingLayer();
    bikeLayer.setMap(map);
    
    //load in the Citibike station data from the JSON file
    map.data.loadGeoJson('data.json');
    map.data.setStyle({visible: false});
    $("#pins").click(function() {
        map.data.setStyle({visible: true});
    });
    
    $("#hidepins").click(function() {
      map.data.setStyle({visible: false});
    });
    
    //add event listeners to the pins
    var originInput = document.getElementById("start");
    var destinationInput = document.getElementById("end");
    
    map.data.addListener('click', function(e){
        document.getElementById("station").textContent = e.feature.H.Station;
        origin = e.feature.H.Station;
    })
    
    var autocomplete = new google.maps.places.Autocomplete(originInput);
    var autocomplete2 = new google.maps.places.Autocomplete(destinationInput);
    autocomplete.bindTo('bounds', map);
    
    $("#setstart").click(function(){
        var startingPoint = document.getElementById("start").textContent;
        console.log(document.getElementById("station").textContent);
        startingPoint = document.getElementById("station").textContent;
        console.log(startingPoint);
    })

    function calculateAndDisplayRoute(directionsService, directionsDisplay) {
        directionsService.route({
            origin: originInput.value,
            destination: destinationInput.value,
            travelMode: google.maps.TravelMode.BICYCLING
        }, 
        
        function(response, status) {
            if (status === google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log(response);
            } else {
            window.alert('Directions request failed due to ' + status);
            }
        });
    }
    
    $("#route").click(function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });
}
