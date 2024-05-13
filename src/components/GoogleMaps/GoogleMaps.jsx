import { useEffect } from 'react';
import "./GoogleMaps.css"
/* eslint-disable no-undef */

export default function GoogleMaps({handleVenue}) { useEffect(() => {

    const script = document.createElement('script');

        
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_Key}&libraries=places&callback=initMap`;

    script.async = true;
    document.body.appendChild(script);

    script.addEventListener('load',function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 40.749933, lng: -73.98633 },
          zoom: 13,
          mapTypeControl: false,
        });
        const card = document.getElementById("pac-card");
        const input = document.getElementById("pac-input");
        const options = {
          fields: ["formatted_address", "geometry", "name"],
          strictBounds: false,
        };
      
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);
      
        const autocomplete = new google.maps.places.Autocomplete(input, options);
      
        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocomplete.bindTo("bounds", map);
      
        const infowindow = new google.maps.InfoWindow();
        const infowindowContent = document.getElementById("infowindow-content");
      
        infowindow.setContent(infowindowContent);
      
        const marker = new google.maps.Marker({
          map,
          anchorPoint: new google.maps.Point(0, -29),
        });
        
        autocomplete.addListener("place_changed", () => {
            infowindow.close();
            marker.setVisible(false);
            
            const place = autocomplete.getPlace();
            console.log(place)
            handleVenue(`${place.name}, ${place.formatted_address}`)
      
          if (!place.geometry || !place.geometry.location) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + place.name + "'");
            return;
          }
      
          // If the place has a geometry, then present it on a map.
          if (place.geometry.viewport) {
            map.fitBounds(place.geometry.viewport);
          } else {
            map.setCenter(place.geometry.location);
            map.setZoom(17);
          }
      
          marker.setPosition(place.geometry.location);
          marker.setVisible(true);
          infowindowContent.children["place-name"].textContent = place.name;
          infowindowContent.children["place-address"].textContent =
            place.formatted_address;
          infowindow.open(map, marker);
        });

      window.initMap = initMap;
} );


    return () => {
      document.body.removeChild(script);
    }
  }, [])
  return <><div class="pac-card" id="pac-card">
      <div>
          {/* <div id="title">Autocomplete search</div>
          <div id="type-selector" class="pac-controls">
              <input
                  type="radio"
                  name="type"
                  id="changetype-all"
                  checked="checked" />
              <label for="changetype-all">All</label>

              <input type="radio" name="type" id="changetype-establishment" />
              <label for="changetype-establishment">establishment</label>

              <input type="radio" name="type" id="changetype-address" />
              <label for="changetype-address">address</label>

              <input type="radio" name="type" id="changetype-geocode" />
              <label for="changetype-geocode">geocode</label>

              <input type="radio" name="type" id="changetype-cities" />
              <label for="changetype-cities">(cities)</label>

              <input type="radio" name="type" id="changetype-regions" />
              <label for="changetype-regions">(regions)</label>
          </div>
          <br />
          <div id="strict-bounds-selector" class="pac-controls">
              <input type="checkbox" id="use-location-bias" value="" checked />
              <label for="use-location-bias">Bias to map viewport</label>

              <input type="checkbox" id="use-strict-bounds" value="" />
              <label for="use-strict-bounds">Strict bounds</label>
          </div> */}
      </div>
      <div id="pac-container">
          <input id="pac-input" type="text" placeholder="Enter a location" />
      </div>
  </div><div id="map"></div><div id="infowindow-content">
          <span id="place-name" class="title"></span><br />
          <span id="place-address"></span>
      </div></>
  
};
  

