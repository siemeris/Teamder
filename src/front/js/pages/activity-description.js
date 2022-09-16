import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams } from "react-router-dom";
import { Navbar } from "../component/navbar";
import { Footer } from "../component/footer";

export const ActivityDescription = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  useEffect(() => {}, []);
  return (
    <>
      <div className="container text-white m-5 p-5">
        <h1 className="d-block text-center text-info m-5">
          Título de la actividad
        </h1>
        <div className="d-flex justify-content-center">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Football_iu_1996.jpg/1024px-Football_iu_1996.jpg"
            className="width: w-25 h-25"
            alt="Nope"
          />
          <div className="card ms-5 shadow">
            <div className="card-header bg-info text-center">Description</div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Participantes</li>
              <li className="list-group-item">Localización</li>
              <li className="list-group-item">Descripción usuario</li>
              <li className="list-group-item text-center">
                <button type="button" class="btn btn-info text-white">
                  Apuntarse
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
