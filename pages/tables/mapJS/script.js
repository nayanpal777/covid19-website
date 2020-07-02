const getcolor = (dead) => {
    if (dead <= 100)
        return "green";
    if(dead >= 100 && dead <= 1000)
        return "grey";
    if(dead >= 1000 && dead <= 3000)
        return "#ff1a1a";
    if(dead >= 3000 && dead <= 5000)
        return "#990000";
    if(dead >= 5000)
        return "#1a0000";
};

function updateMap() {
    fetch("https://www.trackcorona.live/api/countries")
        .then(response => response.json())
        .then(res => {
            console.warn(res.data);
            res.data.forEach(element => {
                lat = element.latitude;
                lon = element.longitude;
                dead = element.dead;

                new mapboxgl.Marker({
                    draggable: false,
                    color: getcolor(dead),
                })
                    .setLngLat([lon, lat])
                    .addTo(map);
            });
        });

};

updateMap();