import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { CardDetalle } from "/workspace/Teamder/src/front/js/component/cardDetalle.js";
import { Link, useParams } from "react-router-dom";
import soccer from "/workspace/Teamder/src/front/img/Diseño sin título.png";

export const Category = () => {
  const { store, actions } = useContext(Context);
  let {category_id} = useParams();

  useEffect(() => {
    actions.getActivities()
  }, []);



  return (
    <div className=" homeBody container w-75">
            {store.activities.filter(actividad => actividad.category == category_id).map((value,index) => {
        return (
        <div className="row">
          <h1 className="text-center text-info p-2 mt-5">{value.category}</h1>
        <div className="col-3">
          {" "}
          <div key={index} className="card px-1 py-1 border border-light shadow border-4 rounded-1" style={{width: '12rem'}}>
            <div className="card-body">
              <h5 className="card-title text-center mt-1">
                {" "}
                <Link to="/activity-description">
                  <img
                    src={soccer}
                    className="card-img-top mx-2"
                    style={{ width: "1.5rem" }}
                    alt="group of people playing soccer"
                  />
                </Link>
                {value.category}
              </h5>
              <h6 className="card-subtitle mb-2 text-muted ">{value.date}</h6>
              <h6 className="card-subtitle mb-2 text-muted">{value.city}</h6>
              <hr></hr>
              <div className="text-center mt-2">
                <button
                  type="button"
                  className="btn btn-outline-info "
                  id="boton usuario"
                  onClick={() => {actions.joinActivity({
                    index: value.id
                  });
                  }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
        </div>
        
          )})}
    </div>
  );
};
