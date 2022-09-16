import React, { useState, useEffect, useContext } from "react";
import {
  GoogleMap,
  InfoWindow,
  LoadScript,
  Marker,
} from "@react-google-maps/api";
import { Context } from "../store/appContext";

export const MapComponent = () => {
  const { store, actions } = useContext(Context);
  const [activeInfoWindow, setActiveInfoWindow] = useState("");
  const [pos, setPos] = useState({});

  useEffect(() => {
    store.markers = [];
    actions.getMarkers();
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude: lat, longitude: lng } }) => {
        const pos = { lat, lng };
        setPos(pos);
        console.log(pos, "pos");
      }
    );
  }, [store.activities]);

  const containerStyle = {
    width: "100%",
    height: "400px",
  };
  const center = pos;
  const mapClicked = (event) => {
    console.log(event.latLng.lat(), event.latLng.lng());
  };
  const markerClicked = (marker, index) => {
    setActiveInfoWindow(index);
    console.log(marker, index);
  };
  const markerDragEnd = (event, index) => {
    console.log(event.latLng.lat());
    console.log(event.latLng.lng());
  };

  return (
    <LoadScript googleMapsApiKey="AIzaSyATlGRXnP8521RNDebgxQjoWXDk2yxgij0">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        onClick={mapClicked}
      >
        {store.markers.map((marker, index) => (
          <Marker
            key={index}
            position={marker.position}
            label={marker.label}
            draggable={marker.draggable}
            onDragEnd={(event) => markerDragEnd(event, index)}
            onClick={(event) => markerClicked(marker, index)}
          >
            {activeInfoWindow === index && (
              <InfoWindow position={marker.position}>
                <div className="">
                  <p>
                    <b>{marker.texto}</b>
                  </p>
                  <p>
                    {marker.fecha}, {marker.time}
                  </p>
                  <p>{marker.lugar}</p>
                  <div className="text-center">
                    <img src={store.iconsList[index]}></img>
                    {store.tempList[index]}
                  </div>
                  <hr className="m-2"></hr>
                  <button
                    className="btn btn-outline-info btn-sm d-flex mx-auto mb-2"
                    onClick={() => {
                      actions.joinActivity({
                        index: marker.id,
                      });
                    }}
                  >
                    Join
                  </button>
                </div>
              </InfoWindow>
            )}
          </Marker>
        ))}
      </GoogleMap>
    </LoadScript>
  );
};
