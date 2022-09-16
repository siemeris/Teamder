import React, { useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import Jumbotron02 from "../../img/Jumbotron02.png";
import { Card } from "../component/card.js";
import { CardDetalle } from "../component/cardDetalle.js";
import { MapComponent } from "../component/mapcomponent.jsx";

export const Home = () => {
  const { store, actions } = useContext(Context);
  return (
    <div className=" homeBody container w-75">
      <div className="text-center mt-1">
        <p>
          <img src={Jumbotron02} className="w-100 h-25" />
        </p>
      </div>
      <h1 className="text-center text-info p-2 mt-5">Categories</h1>
      <hr></hr>
      <Card />
      <h1 className="text-center text-info p-2 mt-5">Activities</h1>
      <hr></hr>
      <div className="row d-flex justify-content-around">
        <CardDetalle />
      </div>
      <h1 className="text-center text-info p-2 mt-5">Near you</h1>
      <hr></hr>
      <MapComponent />
    </div>
  );
};
