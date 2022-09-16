import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link, useParams } from "react-router-dom";
import soccer from "../../img/Diseño sin título.png";
import Basquet from "../../img/Basquet.png";
import Ciclyn from "../../img/Ciclyng.png";
import Running from "../../img/Running.png";
import Voley from "../../img/Voley.png";
import Yoga from "../../img/Yoga.png";

export const Category = () => {
  const { store, actions } = useContext(Context);
  let { category_id } = useParams();

  useEffect(() => {
    actions.getActivities();
    store.tempList = [];
    store.iconsList = [];
    actions.getWeather();
  }, []);

  const hangman = (Image) => {
    let hangmanImage = null;

    switch (Image) {
      case "Soccer":
        hangmanImage = soccer;
        break;
      case "Yoga":
        hangmanImage = Yoga;
        break;
      case "Basketball":
        hangmanImage = Basquet;
        break;
      case "Cycling":
        hangmanImage = Ciclyn;
        break;
      case "Running":
        hangmanImage = Running;
        break;
      case "Volleyball":
        hangmanImage = Voley;
        break;
      default:
        hangmanImage = null;
    }
    return hangmanImage;
  };
  let image = null;

  return (
    <div className=" homeBody container w-75">
      <h1 className="text-center text-info p-2 mt-5">{category_id}</h1>
      <div className="row d-flex justify-content-around">
        {store.activities
          .filter((actividad) => actividad.category == category_id)
          .map((value, index) => {
            return (
              <div
                key={index}
                className="card px-1 mx-2 py-1 border border-light shadow border-4 rounded-1"
                style={{ height: "16rem", width: "14rem" }}
              >
                <div className="card-body">
                  <h5 className="card-title text-center mt-1">
                    <img
                      src={(image = hangman(value.category))}
                      className="card-img-top mx-2"
                      style={{ width: "1.5rem" }}
                      alt="group of people playing soccer"
                    />
                    {value.category}
                  </h5>
                  <h6 className="card-subtitle mb-2 text-muted ">
                    {value.date}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {value.location}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {value.city}
                  </h6>
                  <div className="text-center">
                    <img src={store.iconsList[index]}></img>
                    {store.tempList[index]}
                  </div>
                  <hr className="m-2"></hr>
                  <div className="text-center">
                    <button
                      type="button"
                      className="btn btn-outline-info mt-1"
                      id="boton usuario"
                      onClick={() => {
                        actions.joinActivity({
                          index: value.id,
                        });
                      }}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
