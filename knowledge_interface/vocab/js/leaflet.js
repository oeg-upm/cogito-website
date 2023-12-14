var map = L.map('map').setView([48.1427544930521, 11.612042429294375], 4);

// var map = L.map('map').setView([37.972739, -1.162673], 15);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var marker_munich = L.marker([48.19757108299273, 11.602205590010369]).addTo(map);

var marker_murcia = L.marker([37.972739, -1.162673]).addTo(map);

// var marker_denmark = L.marker([55.62278242048419, 12.577153064263207]).addTo(map);

// var marker_karlsruhe = L.marker([49.007518453764625, 8.401951151725564]).addTo(map);

marker_murcia.bindPopup("Murcia Pilot")
// marker_denmark.bindPopup("Denmark Pilot")
// marker_karlsruhe.bindPopup("Karlsruhe Pilot")
marker_munich.bindPopup("Munich Pilot")

