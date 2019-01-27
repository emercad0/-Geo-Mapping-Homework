
var usgs_data =  "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"

var map = L.map('map');

var openStMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png?{foo}'
    , {
        foo: 'bar',
        attribution: 'Latest USGS 1 Day Magnitude 2.5+ Data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    })

var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Latest USGS 1 Day Magnitude 2.5+ Data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

function colorList(d) {
    return d < d ? getRandomColor() :
       getRandomColor();
}

// Create a legend 
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function () {

    var buildLegend = L.DomUtil.create('ul', 'LEGEND'),
        density = [0, 1, 2, 3, 4, 5, 6, 7, 8];

    for (var i = 0; i < density.length; i++) {
        buildLegend.innerHTML +=
            '<i style="background:' + colorList(density[i] + 1) + '">&nbsp&nbsp&nbsp&nbsp</i> ' +
            density[i] + (density[i + 1] ? '&ndash;' + density[i + 1] + '<br>' : '+');
    }

    return buildLegend;
};

//loaandset view
function setLayout(layout){
var mapLayout = layout
    mapLayout.addTo(map);
    map.setView([36.9908, -101.9005], 5);
    legend.addTo(map);

}
setLayout(openStMap);

//loaddata

function addDataToMap(data, map) {
    var dataLoad = L.geoJson(data, {
        onEachFeature: function (feature, layer) {
            var popDetails = "Magnitude: " + feature.properties.mag
                + "<br>Location: " + feature.properties.place
                + "<br><a href='" + feature.properties.url + "'>Click to view more details</a>";
            layer.bindPopup(popDetails);
        }
    
    }).addTo(map);
    dataLoad.addTo(map);
}
$.getJSON(usgs_data, function (data) {
    addDataToMap(data, map);
});

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//load map data 
//d3.json(usgs_data, function (data) {
 //});



