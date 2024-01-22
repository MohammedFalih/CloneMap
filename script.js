var map = L.map('map').setView([13.0827, 80.2707], 10);

//      <------ tile layers------>
var googleStreets = L.tileLayer('http://{s}.google.com/vt?lyrs=m&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});
var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
var googleSat = L.tileLayer('http://{s}.google.com/vt?lyrs=s&x={x}&y={y}&z={z}',{
    maxZoom: 20,
    subdomains:['mt0','mt1','mt2','mt3']
});

var baseMaps = {
    "Google Streets" : googleStreets,
    "Satellite View": googleSat,
    "OpenStreetMap": osm
};

var layerControl = L.control.layers(baseMaps).addTo(map);

var marker;
var popup;

function onMapClick(e) {
    marker
        L.marker(e.latlng,{ draggable: true }).on('mouseover',onOver).addTo(map);
        marker.on('dragstart', function () {
            marker.closePopup(); // Close popup when marker is dragged
        });
        
        
}
function onOver(e) {
    // alert(this.getLatLng());
    var marker = e.target;
    var latlng = marker.getLatLng();
    var apiKey = 'a7d85a7ef7f34993bb4d3c6aec4feb2a'; 
    var apiUrl = 'https://api.opencagedata.com/geocode/v1/json';

    fetch(`${apiUrl}?key=${apiKey}&q=${latlng.lat}+${latlng.lng}&pretty=1`)
        .then(response => response.json())
        .then(data => {
            // Extract the location name from the API response
            var results = data.results;
            if (results.length > 0) {
                var locationName = results[0].formatted;
                // Creating a popup with the location name
                marker.bindPopup(locationName).openPopup();
            }
        })
        .catch(error => console.error('Error fetching location data:', error));
        marker.on('mouseout', function() {
            marker.closePopup();
        });
}

   
    // marker.bindPopup("This is " + this.getLatLng()).openPopup();
    


map.on('click', onMapClick);

googleStreets.addTo(map);