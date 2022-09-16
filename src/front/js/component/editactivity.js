import { Context } from "../store/appContext";
import React, { useState, useContext, useEffect } from "react";
import Geocode from "react-geocode";

export const EditActivity = ({ propTitle, propDate }) => {
  const { store, actions } = useContext(Context);
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [participants, setParticipants] = useState(null);
  const [date, setDate] = useState("");
  const [city, setCity] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
  Geocode.setApiKey("AIzaSyDSDT6I4RRdO6Uk6hJt6Twp7AdEOcVer20");

  // set response language. Defaults to english.
  Geocode.setLanguage("en");

  // set response region. Its optional.
  // A Geocoding request with region=es (Spain) will return the Spanish city.
  Geocode.setRegion("es");

  // set location_type filter . Its optional.
  // google geocoder returns more that one address for given lat/lng.
  // In some case we need one address as response for which google itself provides a location_type filter.
  // So we can easily parse the result for fetching address components
  // ROOFTOP, RANGE_INTERPOLATED, GEOMETRIC_CENTER, APPROXIMATE are the accepted values.
  // And according to the below google docs in description, ROOFTOP param returns the most accurate result.
  Geocode.setLocationType("ROOFTOP");

  // Enable or disable logs. Its optional.
  Geocode.enableDebug();

  useEffect(() => {
    //Get latitude & longitude from address.
    let direccion = location + "," + city;
    Geocode.fromAddress(direccion).then(
      (response) => {
        const { lat, lng } = response.results[0].geometry.location;
        setLatitude(lat);
        setLongitude(lng);
      },
      (error) => {
        console.error(error);
      }
    );
  }, [location]);

  const handleSubmit = (e) => {
    if (category == "") {
      // let category2 = store.currentActivity.Current_category
      setCategory(store.currentActivity.Current_category);
    }
    if (title == "") {
      // let category2 = store.currentActivity.Current_category
      setTitle(store.currentActivity.Current_title);
    }
    if (participants == null) {
      // let category2 = store.currentActivity.Current_category
      setParticipants(store.currentActivity.Current_players);
    }
    if (date == "") {
      // let category2 = store.currentActivity.Current_category
      setDate(store.currentActivity.Current_date);
    }
    if (location == "") {
      // let category2 = store.currentActivity.Current_category
      setLocation(store.currentActivity.Current_location);
    }
    if (city == "") {
      // let category2 = store.currentActivity.Current_category
      setCity(store.currentActivity.Current_city);
    }
    if (time == "") {
      // let category2 = store.currentActivity.Current_category
      setTime(store.currentActivity.Current_time);
    }
    console.log(category, "category handlesubmit");
    console.log(title, "title handlesubmit");
    e.preventDefault();
    e.target.reset();
  };

  return (
    <form className="mx-5 mt-4" onClick={handleSubmit}>
      <div className="mb-3">
        <label for="exampleInputEmail1" className="form-label">
          Category
        </label>
        <div className="form-group">
          <label className="sr-only">Questions</label>
          <select
            id="reg_userquestion"
            className="form-control"
            name="user_question"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value>Select Category </option>
            <option>Soccer</option>
            <option>Yoga</option>
            <option>Cycling</option>
            <option>Running</option>
            <option>Basketball</option>
            <option>Volleyball</option>
            <option>Others</option>
          </select>
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Title
        </label>
        <input
          className="form-control"
          type="text"
          aria-label="default input example"
          onChange={(e) => setTitle(e.target.value)}
          defaultValue={store.currentActivity.Current_title}
        ></input>
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          onChange={(e) => setDescription(e.target.value)}
          defaultValue={store.currentActivity.Current_description}
        ></textarea>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputParticipants" className="form-label">
          Participants
        </label>
        <input
          class="form-control"
          type="text"
          defaultValue={store.currentActivity.Current_players}
          aria-label="default input example"
          onChange={(e) => setParticipants(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputDate" className="form-label">
          Date
        </label>
        <input
          class="form-control"
          type="text"
          defaultValue={store.currentActivity.Current_date}
          aria-label="default input example"
          onChange={(e) => setDate(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputCity" className="form-label">
          City
        </label>
        <input
          class="form-control"
          type="text"
          defaultValue={store.currentActivity.Current_city}
          aria-label="default input example"
          onChange={(e) => setCity(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputLocation" className="form-label">
          Location
        </label>
        <input
          class="form-control"
          type="text"
          defaultValue={store.currentActivity.Current_location}
          aria-label="default input example"
          onChange={(e) => setLocation(e.target.value)}
        ></input>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputTime" className="form-label">
          Time
        </label>
        <input
          class="form-control"
          type="text"
          defaultValue={store.currentActivity.Current_time}
          aria-label="default input example"
          onChange={(e) => setTime(e.target.value)}
        ></input>
      </div>

      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-secondary"
          data-bs-dismiss="modal"
        >
          Close
        </button>
        <button
          type="submit"
          className="btn btn-info"
          data-bs-dismiss="modal"
          onClick={() => {
            actions.editActivity({
              category: category,
              title: title,
              description: description,
              participants: participants,
              date: date,
              city: city,
              location: location,
              time: time,
              index: store.index,
              latitude: latitude,
              longitude: longitude,
            });
            actions.getActivities();
          }}
        >
          Save Changes
        </button>
      </div>
    </form>
  );
};
