import React, { useState, useEffect, useContext } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../../styles/activitypanel.css";
import { AddActivity } from "./addactivity.js";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { differenceInCalendarDays } from "date-fns";
import { EditActivity } from "../component/editactivity";

export function ActivityPanel() {
  const { store, actions } = useContext(Context);
  const [date, setDate] = useState([
    new Date(2020, 8, 15),
    new Date(2020, 8, 16),
  ]);
  const [value, setValue] = useState(new Date());
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    actions.private();
  }, [store.auth]);

  useEffect(() => {
    store.dates = [];
    actions.getPostedActivities();
  }, [store.activities]);

  useEffect(() => {
    store.datesUser = [];
    actions.getTargetActivities();
    actions.getPostedActivities();
  }, [store.index]);

  function isSameDay(a, b) {
    return differenceInCalendarDays(a, b) === 0;
  }
  return (
    <>
      {token && store.auth === true ? (
        <div className="app-body pt-5">
          <main className=" principal pt-5">
            <div className="container de todo">
              <div className="div-general">
                <div className="row 1">
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12 mb-5">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div>
                          <h2>Events you created</h2>
                        </div>
                      </div>
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div className="div-create text-end">
                          <h2>
                            <button
                              type="button"
                              className="btn btn-info btn-lg ms-1 text-white"
                              style={{ height: "5rem", width: "10rem" }}
                              onClick={() => {
                                (store.index = value.id),
                                  console.log(store.index, "index");
                              }}
                              data-bs-toggle="modal"
                              data-bs-target="#staticBackdropCREATE"
                            >
                              CREATE ACTIVITY
                            </button>
                          </h2>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {store.postedActivities.map((value, i) => {
                        return (
                          <div className="cards col-lg-4 col-md-6 col-sm-6 col-12">
                            <div>
                              <div
                                className="event-card card"
                                style={{ backgroundColor: "rgb(15, 231, 241)" }}
                              >
                                <span className="position-absolute top-0 end-0 badge badge-light rounded-pill">
                                  <button
                                    type="button"
                                    className="btn btn-link btn-sm text-secondary"
                                    onClick={() => {
                                      (store.index = value.id),
                                        console.log(
                                          store.index,
                                          "index boton edit"
                                        );
                                      actions.getCurrentActivity(store.index);
                                    }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="edit"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropEDIT"
                                  >
                                    <i className="far fa fa-edit"></i>
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      (store.index = value.id),
                                        console.log(store.index, "index");
                                    }}
                                    className="btn btn-link btn-sm text-danger"
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="delete"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropDEL"
                                  >
                                    <i className="far fa fa-trash"></i>
                                  </button>
                                  <span className="visually-hidden"></span>
                                </span>
                                <div className="card-body">
                                  <div className="card-title h5">
                                    {value.name}
                                  </div>
                                  <h3 className="event-type">
                                    {value.location}
                                  </h3>
                                  <p className="event-time">{value.time}</p>
                                </div>
                              </div>
                              <div className="event-card date-card card">
                                <div className="date-body card-body">
                                  <h3 className="event-type month">
                                    {value.date}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12 col-12">
                    <div>
                      <h4>Calendar</h4>
                    </div>
                    <Calendar
                      onChange={setDate}
                      selectRange={false}
                      value={value}
                      locale="en-GB"
                      tileClassName={({ date, view }) => {
                        // Add class to tiles in month view only
                        let fechas = store.datesUser.concat(store.dates);

                        if (view === "month") {
                          // Check if a date React-Calendar wants to check is on the list of dates to add class to
                          if (fechas.find((dDate) => isSameDay(dDate, date))) {
                            return "react-calendar__tile--hasActive";
                          }
                        }
                      }}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-8 col-md-8 col-sm-12 col-12 mt-2">
                    <div className="row">
                      <div className="col-lg-6 col-md-6 col-sm-6 col-6">
                        <div>
                          <h2>Events you are going</h2>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      {store.userActivities.map((value, index) => {
                        return (
                          <div className="cards col-lg-4 col-md-6 col-sm-6 col-12">
                            <div>
                              <div
                                className="event-card card"
                                style={{ backgroundColor: "rgb(15, 231, 241)" }}
                              >
                                <span className="position-absolute top-0 end-0 badge badge-light rounded-pill">
                                  <button
                                    type="button"
                                    className="btn btn-link btn-sm text-danger"
                                    onClick={() => {
                                      (store.index = value.id),
                                        console.log(store.index, "index");
                                    }}
                                    data-toggle="tooltip"
                                    data-placement="top"
                                    title="Leave"
                                    data-bs-toggle="modal"
                                    data-bs-target="#staticBackdropLEAVE"
                                  >
                                    <i className="fas fa-sign-out-alt"></i>
                                  </button>
                                  <span className="visually-hidden"></span>
                                </span>
                                <div className="card-body">
                                  <div className="card-title h5">
                                    {value.category}
                                  </div>
                                  <h3 className="event-type">
                                    {value.location}
                                  </h3>
                                  <p className="event-time">{value.time}</p>
                                </div>
                              </div>
                              <div className="event-card date-card card">
                                <div className="date-body card-body">
                                  <h3 className="event-type month">
                                    {value.date}
                                  </h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
          <div
            className="modal fade"
            id="staticBackdropCREATE"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Create event
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <AddActivity />
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="staticBackdropEDIT"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-lg">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Edit event
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <EditActivity
                    title={store.currentActivity.Current_title}
                    date={store.currentActivity.Current_date}
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="staticBackdropDEL"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Delete event
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to delete this event?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      actions.deleteActivity({
                        index: store.index,
                      });
                      actions.getActivities();
                    }}
                    className="btn btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div
            className="modal fade"
            id="staticBackdropLEAVE"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            tabIndex="-1"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Delete event
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <p>Are you sure you want to leave this event?</p>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                    onClick={() => {
                      actions.leaveActivity({
                        index: store.index,
                      });
                      store.datesUser = [];
                      actions.getTargetActivities();
                    }}
                  >
                    Leave
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        navigate("/")
      )}
    </>
  );
}
