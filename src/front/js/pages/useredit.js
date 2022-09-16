import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Link } from "react-router-dom";

export const UserEdit = () => {
  const { store, actions } = useContext(Context);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);
  const [address, setAddress] = useState("");

  useEffect(() => {
    actions.getCurrentUser();
  }, [store.activador]);
  const handleSubmit = (e) => {
    if (name == "") {
      // let category2 = store.currentActivity.Current_category
      setName(store.currentUser.Current_name);
    }
    if (username == "") {
      // let category2 = store.currentActivity.Current_category
      setUsername(store.currentUser.Current_username);
    }
    if (lastname == "") {
      // let category2 = store.currentActivity.Current_category
      setLastname(store.currentUser.Current_lastname);
    }
    if (age == "") {
      // let category2 = store.currentActivity.Current_category
      setAge(store.currentUser.Current_age);
    }
    if (gender == "") {
      // let category2 = store.currentActivity.Current_category
      setGender(store.currentUser.Current_gender);
    }
    if (email == "") {
      // let category2 = store.currentActivity.Current_category
      setEmail(store.currentUser.Current_email);
    }
    if (mobile == 0) {
      // let category2 = store.currentActivity.Current_category
      setMobile(store.currentUser.Current_mobile);
    }
    if (address == "") {
      // let category2 = store.currentActivity.Current_category
      setAddress(store.currentUser.Current_address);
    }
    e.preventDefault();
    e.target.reset();
  };
  return (
    <div onClick={handleSubmit}>
      <div className="container">
        <div className="main-body">
          <div className="row gutters-sm">
            <div className="col-lg-12">
              <div className="card mb-3">
                <div className="card-body">
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Name</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                        defaultValue={store.currentUser.Current_name}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Lastname</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setLastname(e.target.value)}
                        defaultValue={store.currentUser.Current_lastname}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Username</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setUsername(e.target.value)}
                        defaultValue={store.currentUser.Current_username}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Email</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={store.currentUser.Current_email}
                        onChange={(e) => setEmail(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Mobile</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={store.currentUser.Current_mobile}
                        onChange={(e) => setMobile(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Address</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        defaultValue={store.currentUser.Current_address}
                        onChange={(e) => setAddress(e.target.value)}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Age</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setAge(e.target.value)}
                        defaultValue={store.currentUser.Current_age}
                      ></input>
                    </div>
                  </div>
                  <div className="row mb-3">
                    <div className="col-sm-3">
                      <h6 className="mb-0">Gender</h6>
                    </div>
                    <div className="col-sm-9 text-secondary">
                      <input
                        type="text"
                        className="form-control"
                        onChange={(e) => setGender(e.target.value)}
                        defaultValue={store.currentUser.Current_gender}
                      ></input>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal-footer m-auto">
        <button
          type="button"
          className="btn btn-secondary mx-2"
          data-bs-dismiss="modal"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-info"
          onClick={() => {
            actions.editUser({
              email: email,
              name: name,
              username: username,
              lastname: lastname,
              mobile: mobile,
              age: age,
              gender: gender,
              address: address,
            });
            store.activador = true;
            actions.getCurrentUser();
          }}
          data-bs-dismiss="modal"
        >
          Save changes
        </button>
      </div>
    </div>
  );
};
